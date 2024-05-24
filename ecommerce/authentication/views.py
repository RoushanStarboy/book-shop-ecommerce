from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.conf import settings
from django.core.mail import EmailMessage
from .utils import TokenGenerator,generate_token
from django.utils.encoding import force_str, force_bytes
from django.views.generic import View
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth import logout as auth_logout
from django.views.decorators.csrf import csrf_exempt
import json                             # you know who added
from django.http import JsonResponse    # yes again

from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token


@csrf_exempt  # Disable CSRF protection for this view (only for testing purposes)
def signup(request):
    if request.method == "POST":
        # Parse JSON request body
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON.'}, status=400)
        #front res
        userName = data.get('name')  
        email = data.get('email')  
        password = data.get('pass1')  
        confirm_password = data.get('pass2')  

        # Check if passwords match
        if password != confirm_password:
            return JsonResponse({'error': 'Passwords do not match!'}, status=400)

        # Check if email already exists
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'A user with that email address already exists.'}, status=400)

        # Create user if no errors
        user = User.objects.create_user(username=userName, email=email, password=password)
        user.is_active = True
        user.save()
        print("User created with ID:", user.id)  # Log user ID

        # Email activation logic
        email_subject = "Activate Your Account"
        message = render_to_string('activate_acc.html', {
            'user': user,
            'domain': '127.0.0.1:3000',
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': generate_token.make_token(user)
        })

        email_message = EmailMessage(email_subject, message, settings.EMAIL_HOST_USER, [email])
        email_message.send()
        print("Email sending logic executed")
        return JsonResponse({'success': 'Account created! Check your email to activate your account.'})

    return JsonResponse({'error': 'Invalid request method.'}, status=405)  #Invalid method r jnno 405 # I have make a mess here lol 😒


class ActivateAccountView(View):
    def get(self,request,uidb64,token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except Exception as identifier:
            user = None
        if user is not None and generate_token.check_token(user,token):
            user.is_active = True
            user.save()
            messages.info("Account Activated Successfully")
            return redirect('/login')
        return render(request,'activateFail.html')

@csrf_exempt
def login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)  # Handle JSON parsing error 

        # Extract data from request
        username = data.get('name')
        user_password = data.get('pass1')

        # Print for debugging
        print(f"Username from request: {username}")
        print(f"Password from request: {user_password}")

        # Authenticate user
        my_user = authenticate(username=username, password=user_password)

        # Print the authentication result
        print(f"Authentication result: {my_user}")

        if my_user is not None:
            auth_login(request, my_user)
            response = JsonResponse({'success': 'Login Success'})
            response.set_cookie('userLoggedIn', 'true', httponly=True, samesite='Lax')
            return response
        else:
            return JsonResponse({'error': 'Invalid Credentials'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)



def logout(request):
    print("Request method:", request.method)                                     # Debugging output to console
    if request.method == "POST":
        auth_logout(request)                                                    # Perform the logout operation
        print("Logged out successfully")                                          # Debugging output
        response = JsonResponse({'message': 'Logged out Successfully!'})
        response.delete_cookie('csrftoken')                                     # Consider whether you need this
        return response
    print("Invalid request method")                                                 # Debugging output
    return JsonResponse({'error': 'Invalid request method.'})                   # I have to delete debug


    
