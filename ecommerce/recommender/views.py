import json
from django.shortcuts import render, redirect
from django.urls import reverse
from .models import Contact, Book
from django.contrib import messages
import pickle, os
import numpy as np
import pandas as pd
from django.http import request, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Order, OrderUpdate
from django.core.paginator import Paginator
from django.conf import settings
from django.http import HttpResponseNotFound
from django.shortcuts import get_object_or_404
import stripe


# ... loading rating_matrix, similarity_scores, and popular_df ...
popular_df = pd.read_pickle(open(os.path.join('data', 'popular_df.pkl'), 'rb'))
rating_matrix = pd.read_pickle(open(os.path.join('data', 'rating_matrix.pkl'), 'rb'))
similarity_scores = pd.read_pickle(open(os.path.join('data', 'similarity_scores.pkl'), 'rb'))
books = pd.read_pickle(open(os.path.join('data', 'books.pkl'), 'rb'))

# Loading the data from the pickle file
books_df = pd.read_pickle(open(os.path.join('data', 'books.pkl'), 'rb'))

@csrf_exempt
@require_http_methods(["GET"])
def get_books_data(request):
    try:
        books_df = pd.read_pickle(open(os.path.join('data', 'books.pkl'), 'rb'))
        books_data = books_df.to_dict(orient='records')
        page_number = int(request.GET.get('page', 1))
        page_size = int(request.GET.get('page_size', 10))

        paginator = Paginator(books_data, page_size)
        page_obj = paginator.get_page(page_number)

        response_data = {
            'books': list(page_obj),
            'page_number': page_obj.number,
            'page_size': page_size,
            'total_pages': paginator.num_pages,
            'total_books': paginator.count
        }

        return JsonResponse(response_data)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def home(request):
    """It fetches top 50 popular books from the database."""

    books = Book.objects.all()
    context = {'books': books}
    return render(request, 'base.html', context)

def recommend_popular(request, num_recommendations=20):
    try:
        top_books = popular_df.sort_values('avg_rating', ascending=True).head(num_recommendations)
        recommendations = []
        nums = 0
        for _, row in top_books.iterrows():
            item = {
                'id' : nums,                    # added for no reason (Still )
                'title': row['Book-Title'] if 'Book-Title' in row else 'Not Available',         # handled here <Look Here>
                'author': row['Book-Author'] if 'Book-Author' in row else 'Not Available',      # handled here
                'image': row['Image-URL-M'] if 'Image-URL-M' in row else 'Not Available',
                'rating': row['avg_rating'] if 'avg_rating' in row else 'Not Available',            # handled here
                'price': row['price'] if 'price' in row else 'Not Available'                            # Defaulting to 'Not Available' if price is missing
            }
            recommendations.append(item)
            nums += 1
        return JsonResponse({'top_books': recommendations})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)



def recommend_collaborative(book_name, num_recommendations=10):
    # Collaborative recommendation goes logic here...
    index = np.where(rating_matrix.index==book_name)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])),key=lambda x:x[1],reverse=True)[1:11]
    recommendations = []
    for i in similar_items:
        item = {}
        temp_df = books[books['Book-Title'] == rating_matrix.index[i[0]]].drop_duplicates('Book-Title')
        item['title'] = temp_df['Book-Title'].values[0]
        item['author'] = temp_df['Book-Author'].values[0]
        item['image_url'] = temp_df['Image-URL-M'].values[0]
        item['price'] = float(temp_df['price'].values[0])
        recommendations.append(item)

    return recommendations[:num_recommendations]

@csrf_exempt  # This decorator is used to bypass CSRF verification for demonstration purposes.
@require_http_methods(["POST"])  # This decorator restricts this view to only handle POST requests.
def get_recommendations(request):
    # Extracting the book title from the POST request data
    try:
        book_title = request.POST['book_title']
        if not book_title:
            return JsonResponse({'error': 'Book title is required'}, status=400)
    except KeyError:
        return JsonResponse({'error': 'Book title is required'}, status=400)

    # Fetching recommendations using the provided book title
    try:
        recommendations = recommend_collaborative(book_name=book_title, num_recommendations=10)
        return JsonResponse({'recommendations': recommendations})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def search_and_recommend(request):
    try:
        book_title = request.POST['book_title']
        if not book_title:
            return JsonResponse({'error': 'Book title is required'}, status=400)

        # Fetching the book details from the database
        book_query = books[books['Book-Title'].str.contains(book_title, case=False)]
        if book_query.empty:
            return JsonResponse({'error': 'No book found'}, status=404)

        # Assuming 'books' DataFrame has a unique identifier for each book
        book_details = book_query.to_dict('records')[0]  # Taking the first match for simplicity

        # Getting recommendations based on the book found
        recommendations = recommend_collaborative(book_name=book_title, num_recommendations=10)

        # Preparing the response
        response_data = {
            'book_details': book_details,
            'recommendations': recommendations
        }
        return JsonResponse(response_data)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def detail(request, id):
    try:
        book = Book.objects.get(id=id)
    except Book.DoesNotExist:
        return render(request, '404.html')
    stripe_publishable_key = settings.STRIPE_PUBLISHABLE_KEY
    return render(request, 'recommender/detail.html', {'book': book, 'stripe_publishable_key': stripe_publishable_key})


@csrf_exempt
def checkout(request, id):
    if not request.user.is_authenticated:
        messages.warning(request, "Login & Try again")
        return redirect('login.html')

    if request.method == 'POST':
        request_data = json.loads(request.body)
        book = Book.objects.get(id=id)
        stripe.api_key = settings.STRIPE_SECRET_KEY
        checkout_session = stripe.checkout.Session.create(
            customer_email = request_data['email'],
            payment_method_types = ['card'],
            line_items=[
                {
                    'price_data':{
                        'currency':'usd',
                        'book_data':{
                            'name':book.title,
                        },
                        'unit_amount':book.price
                    },
                    'quantity':1,
                }
            ],
            mode='payment',
            success_url=request.build_absolute_uri(reverse('success')) +
            "?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=request.build_absolute_uri(reverse('failed')),
        )
        order = Order()
        order.customer_email = request_data['email']
        order.book = book
        order.stripe_payment_intent = checkout_session['payment_intent']
        order.amount = book.price
        order.save()

        return JsonResponse({'sessionId':checkout_session.id})

def payment_success_view(request):
    session_id = request.GET.get('session_id')
    if session_id is None:
        return HttpResponseNotFound()
    stripe.api_key = settings.STRIPE_SECRET_KEY
    session = stripe.checkout.Session.retrieve(session_id)
    order = get_object_or_404(Order, stripe_payment_intent=session.payment_intent)
    order.has_paid = True
    order.save()

    return render(request, 'recommender/payment_success.html',{'order':order})

def payment_failed_view(request):
    return render(request, 'recommender/failed.html')

def profile(request):
    if not request.user.is_authenticated:
        messages.warning(request,"Login & Try Again")
        return redirect('login.html')
    currentuser=request.user.username
    items=Order.objects.filter(email=currentuser)
    rid=""
    for i in items:
        print(i.oid)
        # print(i.order_id)
        myid=i.oid
        rid=myid.replace("store","")
        print(rid)
    status=OrderUpdate.objects.filter(order_id=int(rid))
    for j in status:
        print(j.update_desc)


    context ={"items":items,"status":status}
    # print(currentuser)
    return render(request,"profile.html",context)

def contact(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        phone_no = request.POST.get("phone_no")
        desc = request.POST.get("desc")
        query = Contact(name=name,email=email,phone_no=phone_no,desc=desc)
        query.save()
        messages.info(request,"We will get back to you soon...")
        return render(request,"contact.html")

    return render(request,"contact.html")

def about(request):
    return render(request,"about.html")