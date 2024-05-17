from django.contrib import admin
from .models import Book,Contact,Orders,OrderUpdate


admin.site.register(Book)
admin.site.register(Contact)
admin.site.register(Orders)
admin.site.register(OrderUpdate)
