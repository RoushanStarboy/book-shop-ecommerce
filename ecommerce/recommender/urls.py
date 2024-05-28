from django.contrib import admin
from django.urls import path, include
from recommender import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('recommendations/', views.get_recommendations, name='get_recommendations'),
    path('search', views.search_and_recommend, name='search_and_recommend'),
    path('recommendpopular/',views.recommend_popular,name='recommend_popular'),
    path('api/books/', views.get_books_data, name='get_books_data'),
    # path('product/<int:id>', views.detail, name='detail'),
    # path('success/', views.payment_success_view, name='success'),
    # path('failed/', views.payment_failed_view, name='failed'),
    # path('checkout-session/<int:id>/', views.checkout, name='checkout-session'),

]