# Generated by Django 5.0.6 on 2024-05-25 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recommender', '0006_order_delete_orders'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='average_rating',
        ),
        migrations.RemoveField(
            model_name='book',
            name='image_url',
        ),
        migrations.RemoveField(
            model_name='book',
            name='rating',
        ),
        migrations.AddField(
            model_name='book',
            name='image_url_large',
            field=models.URLField(default='https://s2982.pcdn.co/wp-content/uploads/2018/07/Reodeer-Book-Holder.jpg'),
        ),
        migrations.AddField(
            model_name='book',
            name='image_url_medium',
            field=models.URLField(default='https://s2982.pcdn.co/wp-content/uploads/2018/07/Reodeer-Book-Holder.jpg'),
        ),
        migrations.AddField(
            model_name='book',
            name='image_url_small',
            field=models.URLField(default='https://s2982.pcdn.co/wp-content/uploads/2018/07/Reodeer-Book-Holder.jpg'),
        ),
        migrations.AddField(
            model_name='book',
            name='isbn',
            field=models.CharField(default='9876543', max_length=20, unique=True),
        ),
    ]
