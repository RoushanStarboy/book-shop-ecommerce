from django.shortcuts import render
import json
from recommender.models import Book
from django.contrib import messages
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import stripe
from django.conf import settings
from django.urls import reverse


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

    return JsonResponse({'books': books_details})

stripe.api_key = settings.STRIPE_SECRET_KEY

def cart(request):
    cart = get_cart(request)
    total_price = get_total_cost(request)

    cart_items = []
    line_items = []
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

        line_items.append({
            'price_data': {
                'currency': 'usd',
                'product_data': {
                    'name': book.title,
                },
                'unit_amount': int(book.price * 100),  # Stripe expects the amount in cents
            },
            'quantity': item['quantity'],
        })

    try:
        # Create Stripe Checkout Session
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=request.build_absolute_uri(reverse('success')) + "?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=request.build_absolute_uri(reverse('failed')),
        )

        context = {
            'cart_items': cart_items,
            'total_price': total_price,
            'session_id': session.id,
        }
        return JsonResponse(context)

    except stripe.error.StripeError as e:
        # Handle Stripe errors
        return JsonResponse({'error': 'Stripe error', 'details': str(e)}, status=500)
    except Exception as e:
        # Handle other possible errors
        return JsonResponse({'error': 'An error occurred', 'details': str(e)}, status=500)



