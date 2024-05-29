from django.shortcuts import render, get_object_or_404
import json
from recommender.models import Book, Order
from django.contrib import messages
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponseNotFound
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import stripe
import logging
from django.conf import settings
from django.urls import reverse
from recommender.views import search_and_recommend




def get_cart(request):
    """
    Retrieves cart items from the session or creates an empty cart.
    """
    cart_id = request.session.get('cart_id')
    cart = {}
    if cart_id:
        try:
            cart = json.loads(request.session.get(cart_id, '{}'))
        except (KeyError, json.JSONDecodeError):
            pass
    return cart

def add_to_cart(request, product_id, quantity=1):
    """
    Adds a product to the cart or updates its quantity.
    """
    cart = get_cart(request)
    product_id = str(product_id)
    if product_id in cart:
        cart[product_id]['quantity'] = cart[product_id]['quantity'] + quantity
    else:
        cart[product_id] = {'quantity': quantity}
    request.session['cart_id'] = json.dumps(cart)


def remove_from_cart(request, product_id):
    """
    Removes a product from the cart.
    """
    cart = get_cart(request)
    product_id = str(product_id)
    if product_id in cart:
        del cart[product_id]
    request.session['cart_id'] = json.dumps(cart)

def get_total_cost(request):
    """
    Calculates the total cost of all items in the cart.
    """
    cart = get_cart(request)
    total_price = 0
    for product_id, item in cart.items():
        try:
            product = Book.objects.get(pk=product_id)
            total_price += product.price * item['quantity']
        except Book.DoesNotExist:
            continue  # Skip if the product does not exist
    return total_price

    # if request.method == 'POST':
    #     # Handling adding to cart
    #     quantity = int(request.POST.get('quantity', 1))
    #     add_to_cart(request, book.id, quantity)  # Assuming add_to_cart is defined elsewhere
    #     return JsonResponse({'message': 'Book added to cart!'})


@csrf_exempt
@require_http_methods(["GET", "POST"])
def product_detail(request):
    # Handle query parameters for GET and POST requests
    if request.method == "GET":
        book_title = request.GET.get('title')
    elif request.method == "POST":
        book_title = request.POST.get('title')

    if not book_title:
        return JsonResponse({'error': 'No book name provided'}, status=400)

    # Using filter instead of get to handle multiple results
    books = Book.objects.filter(title=book_title)
    if not books.exists():
        return JsonResponse({'error': 'Book not found'}, status=404)

    # Preparing the context with book details
    books_details = []
    for book in books:
        book_detail = {
            'isbn': book.isbn,
            'title': book.title,
            'author': book.author,
            'price': book.price,
            'image_url_small': book.image_url_small,
            'image_url_medium': book.image_url_medium,
            'image_url_large': book.image_url_large,
            'Y_Pub': book.Y_Pub,
            'publisher': book.publisher,
        }
        books_details.append(book_detail)

    # Fetch recommendations
    recommendations_response = search_and_recommend(request)
    recommendations = {}
    if recommendations_response.status_code == 200:
        recommendations_content = json.loads(recommendations_response.content)
        recommendations = recommendations_content.get('recommendations', [])
    else:
        recommendations = {'error': 'Error fetching recommendations'}

    return JsonResponse({'books': books_details, 'recommendations': recommendations})


# Set up logging
logger = logging.getLogger(__name__)

stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def cart(request):
    if request.method == 'GET':
        try:
            cart = get_cart(request)
            total_price = get_total_cost(request)

            cart_items = []
            for item_id, item in cart.items():
                try:
                    book = Book.objects.get(pk=item_id)
                except Book.DoesNotExist:
                    continue  # Skip this item if the book does not exist

                cart_items.append({
                    'title': book.title,
                    'price': book.price,
                    'quantity': item['quantity'],
                })

            context = {
                'cart_items': cart_items,
                'total_price': total_price,
            }
            return JsonResponse(context)
        except Exception as e:
            logger.error("Error processing GET request: %s", str(e))
            return JsonResponse({'error': 'An error occurred', 'details': str(e)}, status=500)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            title = data.get('title')
            price = data.get('price')
            print(price)

            if not title or not price:
                return JsonResponse({'error': 'Title and price are required'}, status=400)

            book, created = Book.objects.get_or_create(title=title, defaults={'price': price})
            logger.info("Received POST data: title=%s, price=%s", title, price)

            # Create line items for Stripe session
            line_items = [{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': title,
                    },
                    'unit_amount': int(price * 100),  # Stripe expects the amount in cents
                },
                'quantity': 1,
            }]

            # Create Stripe Checkout Session
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=line_items,
                mode='payment',
                success_url=request.build_absolute_uri(reverse('success')) + "?session_id={CHECKOUT_SESSION_ID}",
                cancel_url=request.build_absolute_uri(reverse('failed')),
            )

            order = Order()
            order.book = book
            order.stripe_payment_intent = session.payment_intent
            order.amount = int(book.price)
            order.save()

            return JsonResponse({'session_id': session.id})

        except json.JSONDecodeError as e:
            logger.error("JSON decode error: %s", str(e))
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except stripe.error.StripeError as e:
            logger.error("Stripe error: %s", str(e))
            return JsonResponse({'error': 'Stripe error', 'details': str(e)}, status=500)
        except Exception as e:
            logger.error("Error processing POST request: %s", str(e))
            return JsonResponse({'error': 'An error occurred', 'details': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def payment_success(request):
    # Retrieve the session_id from the query parameters
    session_id = request.GET.get('session_id')
    if session_id is None:
        return HttpResponseNotFound()
    stripe.api_key = settings.STRIPE_SECRET_KEY
    the_session = stripe.checkout.Session.retrieve(session_id)
    order = get_object_or_404(Order, stripe_payment_intent=the_session.payment_intent)
    order.has_paid = True
    order.save()

    # if not session_id:
    #     return JsonResponse({'error': 'No session ID provided'}, status=400)

    return render(request, 'success.html', {'order': order})

# Failed view
@csrf_exempt
def payment_failed(request):
    return render(request, 'failed.html')