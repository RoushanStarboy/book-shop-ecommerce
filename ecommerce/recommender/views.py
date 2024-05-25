import json
from django.shortcuts import render, redirect
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


# ... loading rating_matrix, similarity_scores, and popular_df ...
popular_df = pd.read_pickle(open(os.path.join('data', 'popular_df.pkl'), 'rb'))
rating_matrix = pd.read_pickle(open(os.path.join('data', 'rating_matrix.pkl'), 'rb'))
similarity_scores = pd.read_pickle(open(os.path.join('data', 'similarity_scores.pkl'), 'rb'))
final_df = pd.read_pickle(open(os.path.join('data', 'final_df_sorted.pkl'), 'rb'))

# Loading the data from the pickle file
books_df = pd.read_pickle(open(os.path.join('data', 'books.pkl'), 'rb'))

@csrf_exempt
@require_http_methods(["GET"])
def get_books_data(request):
    try:
        books_df = pd.read_pickle(open(os.path.join('data', 'final_df_sorted.pkl'), 'rb'))
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
    try:
        # Collaborative recommendation logic
        print(f"Book name for recommendation: {book_name}")

        # Check if the book name exists in the rating matrix index
        book_indices = np.where(rating_matrix.index == book_name)[0]
        if len(book_indices) == 0:
            raise ValueError(f"Book '{book_name}' not found in rating matrix index.")

        index = book_indices[0]
        print(f"Index found: {index}")

        similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:11]
        print(f"Similar items found: {similar_items}")

        recommendations = []
        for i in similar_items:
            item = {}
            temp_df = final_df[final_df['Book-Title'] == rating_matrix.index[i[0]]].drop_duplicates('Book-Title')
            print(f"Temp DataFrame for similar item: {temp_df}")

            if not temp_df.empty:
                item['title'] = temp_df['Book-Title'].values[0]
                item['author'] = temp_df['Book-Author'].values[0]
                item['image_url'] = temp_df['Image-URL-M'].values[0]
                item['price'] = float(temp_df['price'].values[0])
                recommendations.append(item)

        print(f"Recommendations generated: {recommendations}")

        return recommendations[:num_recommendations]
    except Exception as e:
        print(f"Error in recommendation function: {e}")
        raise e



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
        book_title = request.POST.get('title')
        if not book_title:
            return JsonResponse({'error': 'Book title is required'}, status=400)

        book_query = final_df[final_df['Book-Title'].str.contains(book_title, case=False)]
        if book_query.empty:
            return JsonResponse({'error': 'No book found'}, status=404)

        book_details = book_query.to_dict('records')[0]

        try:
            recommendations = recommend_collaborative(book_name=book_details['Book-Title'], num_recommendations=10)
        except Exception as e:
            print(f"Error in recommendation function: {e}")
            return JsonResponse({'error': 'Error in generating recommendations', 'details': str(e)}, status=500)

        response_data = {
            'book_details': book_details,
            'recommendations': recommendations
        }
        return JsonResponse(response_data)

    except Exception as e:
        print(f"General error: {e}")
        return JsonResponse({'error': str(e)}, status=500)


def checkout(request):
    if not request.user.is_authenticated:
        messages.warning(request, "Login & Try again")
        return redirect('login.html')

    if request.method == 'POST':
        items = request.POST.get('items', '')
        name = request.POST.get('name', '')
        amount = request.POST.get('amt')
        email = request.POST.get('email', '')
        address1 = request.POST.get('address1', '')
        city = request.POST.get('city', '')
        state = request.POST.get('state', '')
        zip_code = request.POST.get('zip_code', '')
        phone = request.POST.get('phone', '')
        Order = Order(items = items, name = name, amount = amount, email = email, address1 = address1, city = city, state = state, zip_code = zip_code, phone = phone)
        print(amount)
        Order.save()
        update = OrderUpdate(order_id=Order.order_id,update_desc="the order has been placed")
        update.save()
        thank = True

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