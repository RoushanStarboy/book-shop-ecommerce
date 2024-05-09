from django.db import models

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=500)
    author = models.CharField(max_length=50)
    price = models.IntegerField()
    average_rating = models.FloatField()
    image_url = models.URLField()

    def __str__(self):
        return self.title


class Contact(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_no = models.IntegerField()
    desc = models.TextField(max_length=1000)

    def __str__(self):
        return self.name


