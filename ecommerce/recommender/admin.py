from django.contrib import admin
from .models import Book,Contact,Order,OrderUpdate


admin.site.register(Book)
admin.site.register(Contact)
admin.site.register(Order)
admin.site.register(OrderUpdate)
