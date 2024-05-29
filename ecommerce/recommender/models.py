from django.db import models

# Create your models here.
class Book(models.Model):
    isbn = models.CharField(max_length=20, unique=True, default='9876543')
    title = models.CharField(max_length=500)
    author = models.CharField(max_length=50)
    Y_Pub = models.CharField(max_length=255, default='1950')
    publisher = models.CharField(max_length=500, default='Not available')
    image_url_small = models.URLField(default='https://s2982.pcdn.co/wp-content/uploads/2018/07/Reodeer-Book-Holder.jpg')
    image_url_medium = models.URLField(default='https://s2982.pcdn.co/wp-content/uploads/2018/07/Reodeer-Book-Holder.jpg')
    image_url_large = models.URLField(default='https://s2982.pcdn.co/wp-content/uploads/2018/07/Reodeer-Book-Holder.jpg')
    price = models.IntegerField()

    def __str__(self):
        return self.title


class Contact(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_no = models.IntegerField()
    desc = models.TextField(max_length=1000)

    def __str__(self):
        return self.name


class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    customer_email = models.EmailField(max_length=90)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    amount = models.IntegerField()
    stripe_payment_intent = models.CharField(max_length=2000)
    has_paid = models.BooleanField(default=False)
    ordered_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.customer_email


class OrderUpdate(models.Model):
    update_id = models.AutoField(primary_key=True)
    order_id = models.IntegerField(default="")
    update_desc = models.CharField(max_length=5000)
    delivered=models.BooleanField(default=False)
    timestamp = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.update_desc[0:7] + "..."