import pandas as pd
from django.core.management.base import BaseCommand
from recommender.models import Book  # Adjust the import path if needed
import os

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        popular_df = pd.read_pickle(os.path.join('data', 'popular_df.pkl'))

        for index, row in popular_df.iterrows():
            book, created = Book.objects.get_or_create(
                title=row['Book-Title'],
                defaults={  # Set defaults for other fields
                    'author': row['Book-Author'],
                    'price': row['price'],
                    'average_rating': row['avg_rating'],
                    'image_url': row['Image-URL-M'],
                }
            )
