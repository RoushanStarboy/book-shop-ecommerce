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
from django.contrib.auth import authenticate, login, logout


def signup(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('pass1')
        confirm_password = request.POST.get('pass2')

        if password != confirm_password:
            messages.warning(request, 'Passwords do not match!')
            return render(request, 'signup.html')

        if User.objects.filter(username=email).exists():
            messages.error(request, 'A user with that email address already exists.')
            return render(request, 'signup.html')

        # If no errors, create the user
        user = User.objects.create_user(email, email, password)
        user.is_active = False
        user.save()
        print("User created with ID:", user.id)

        email_subject = "Activate Your Account"
        message = render_to_string('activate_acc.html',{
            'user':user,
            'domain':'127.0.0.1:8000',
            'uid':urlsafe_base64_encode(force_bytes(user.pk)),
            'token':generate_token.make_token(user)
        })

        email_message = EmailMessage(email_subject,message,settings.EMAIL_HOST_USER,[email])
        email_message.send()
        print("Email sending logic executed")
        messages.success(request, 'Account created! Check your email to activate your account.')
        return redirect('login/')

    return render(request, "signup.html")


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


def login(request):
    if request.method == "POST":
        username = request.POST.get('email')
        user_password = request.POST.get('pass1')
        my_user = authenticate(username=username, password=user_password)

        if my_user is not None:
            login(request, my_user)
            messages.success(request, "Login Success")
            return redirect('/')
        else:
            messages.error(request, "Invalid Credentials")
            return redirect('/login')
    return render(request,"login.html")


def handlelogout(request):
    logout(request)
    messages.info(request,"Logout Success")
    return redirect('/auth/login')
