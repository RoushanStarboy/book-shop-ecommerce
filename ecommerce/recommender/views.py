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
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors


popular_df = pd.read_pickle(open(os.path.join('data', 'top_books_recom.pkl'), 'rb'))
tfidf_matrix = pd.read_pickle(open(os.path.join('data', 'tfidf_vectorizer.pkl'), 'rb'))
similarity_scores = pd.read_pickle(open(os.path.join('data', 'similarity_scores.pkl'), 'rb'))
final_df = pd.read_pickle(open(os.path.join('data', 'all_books.pkl'), 'rb'))
nn = pd.read_pickle(open(os.path.join('data', 'nearest_neighbors.pkl'), 'rb'))


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
                'image': row['Image-URL-L'] if 'Image-URL-L' in row else 'Not Available',
                'rating': row['avg_rating'] if 'avg_rating' in row else 'Not Available',            # handled here
                'price': row['Price'] if 'Price' in row else 'Not Available'                            # Defaulting to 'Not Available' if price is missing
            }
            recommendations.append(item)
            nums += 1
        return JsonResponse({'top_books': recommendations})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def normalize_title(title):
    return title.lower().strip()


def recommend_books(book_title, num_recommendations=10):
    """  Function to recommend books based on content """
    # Normalize the book title
    book_title = normalize_title(book_title)

    # Get the index of the book that matches the title
    idx = final_df[final_df['Book-Title'].apply(normalize_title) == book_title].index[0]

    # Transform the input text using the TF-IDF vectorizer
    book_tfidf = tfidf_matrix.transform([final_df['combined_features'].iloc[idx]])

    # Get the pairwise similarity scores of all books with that book
    distances, indices = nn.kneighbors(book_tfidf, n_neighbors=num_recommendations + 1)

    # Get the scores of the most similar books
    similar_indices = indices.flatten()[1:]  # Exclude the first index which is the book itself

    # Return the top recommended books
    return final_df.iloc[similar_indices][['Book-Title', 'Book-Author', 'Image-URL-M', 'Publisher']]



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
        recommendations = recommend_books(book_name=book_title, num_recommendations=10)
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

        normalized_book_title = normalize_title(book_title)
        book_query = final_df[final_df['Book-Title'].apply(normalize_title).str.contains(normalized_book_title, case=False)]
        if book_query.empty:
            return JsonResponse({'error': 'No book found'}, status=404)

        book_details = book_query.to_dict('records')[0]
        try:
            recommendations = recommend_books(book_title=book_details['Book-Title'], num_recommendations=10)
        except Exception as e:
            print(f"Error in recommendation function: {e}")
            return JsonResponse({'error': 'Error in generating recommendations', 'details': str(e)}, status=500)

        response_data = {
            'book_details': book_details,
            'recommendations': recommendations.to_dict('records')
        }
        return JsonResponse(response_data)

    except Exception as e:
        print(f"General error: {e}")
        return JsonResponse({'error': str(e)}, status=500)

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