from django.db import models

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=500)
    author = models.CharField(max_length=50)
    price = models.IntegerField()
    average_rating = models.FloatField()
    image_url = models.URLField()
    rating = models.FloatField(default=0.0)
    Y_Pub = models.CharField(max_length=255, default='1950')
    publisher = models.CharField(max_length=500, default='Not available')

    def __str__(self):
        return self.title


class Contact(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_no = models.IntegerField()
    desc = models.TextField(max_length=1000)

    def __str__(self):
        return self.name


class Orders(models.Model):
    order_id = models.AutoField(primary_key=True)
    items =  models.CharField(max_length=5000)
    amount = models.IntegerField(default=0)
    name = models.CharField(max_length=90)
    email = models.CharField(max_length=90)
    address1 = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=100)
    oid=models.CharField(max_length=150,blank=True)
    amountpaid=models.CharField(max_length=500,blank=True,null=True)
    paymentstatus=models.CharField(max_length=20,blank=True)
    phone = models.CharField(max_length=100,default="")

    def __str__(self):
        return self.name


class OrderUpdate(models.Model):
    update_id = models.AutoField(primary_key=True)
    order_id = models.IntegerField(default="")
    update_desc = models.CharField(max_length=5000)
    delivered=models.BooleanField(default=False)
    timestamp = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.update_desc[0:7] + "..."