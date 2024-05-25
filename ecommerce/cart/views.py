from django.shortcuts import render
import json
from recommender.models import Book
from django.contrib import messages
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt


def get_cart(request):
    """
    Retrieves cart items from the session or creates an empty cart.
    """
    cart_id = request.session.get('cart_id')
    cart = {}
    if cart_id:
        try:
            cart = json.loads(request.session[cart_id])
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
        product = Book.objects.get(pk=product_id)
        total_price += product.price * item['quantity']
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

    try:
        book = Book.objects.get(title=book_title)
    except Book.DoesNotExist:
        return JsonResponse({'error': 'Book not found'}, status=404)

    # Preparing the context with book details
    context = {
        'title': book.title,
        'author': book.author,
        'price': book.price,
        'rating': book.rating,
        'image_url': book.image_url,
        'Y_Pub': book.Y_Pub,
        'publisher': book.publisher,
    }

    return JsonResponse(context)


def cart(request):
    cart = get_cart(request)
    total_price = get_total_cost(request)

    cart_items = []
    for item_id, item in cart.items():
        book = Book.objects.get(pk=item_id)
        cart_items.append({
            'title': book.title,
            'price': book.price,
            'quatity': item['quantity'],
        })

    context = {
        'cart_items': cart_items,
        'total_price': total_price,
    }

    return JsonResponse(context)

