# Generated by Django 5.0.6 on 2024-07-03 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recommender', '0007_remove_book_average_rating_remove_book_image_url_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='stripe_payment_intent',
            field=models.CharField(max_length=2000),
        ),
    ]
