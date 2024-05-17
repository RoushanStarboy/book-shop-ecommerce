# Django management command within your app, for example, recommender/management/commands/import_all_books.py
from django.core.management.base import BaseCommand
import pandas as pd
import os
from recommender.models import Book  # Adjust the import path as necessary

class Command(BaseCommand):
    help = 'Load all books from a DataFrame into the Book model'

    def handle(self, *args, **kwargs):
        # Path to the DataFrame file
        df_path = os.path.join('data', 'books.pkl')
        # Load DataFrame
        all_books_df = pd.read_pickle(df_path)

        # Process each book in the DataFrame
        for index, row in all_books_df.iterrows():
            book, created = Book.objects.update_or_create(
                title=row['Book-Title'],  # Adjust field names as necessary
                defaults={
                    'author': row.get('Book-Author', ''),
                    'price': row.get('Price', 0),
                    'average_rating': row.get('Average-Rating', 0),
                    'image_url': row.get('Image-URL-M', '')
                }
            )
            

