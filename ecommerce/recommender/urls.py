from django.contrib import admin
from django.urls import path, include
from recommender import views

urlpatterns = [
    path('', views.home, name='home'),
    path('recommendations/', views.get_recommendations, name='get_recommendations'),
    path('search/', views.search_and_recommend, name='search_and_recommend'),
    path('rando/', views.rando, name='rando'),
    path('recommendpopular/',views.recommend_popular,name='recommend_popular')

]