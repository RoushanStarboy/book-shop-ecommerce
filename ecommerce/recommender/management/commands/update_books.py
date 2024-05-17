import pandas as pd
import os
from django.core.management.base import BaseCommand
from recommender.models import Book

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        # Load your DataFrame
        final_df_sorted = pd.read_pickle(os.path.join('data', 'final_df_sorted.pkl'))

        # Preparing for batch processing
        batch_size = 1000  # Adjust batch size based on memory and database capabilities
        books_to_create = []

        # Iterate through the DataFrame
        for index, row in final_df_sorted.iterrows():
            # Create Book instance for each row if not already in the database
            if not Book.objects.filter(title=row['Book-Title']).exists():
                books_to_create.append(Book(
                    title=row['Book-Title'],
                    author=row['Book-Author'],
                    price=row['Price'],
                    average_rating=row['avg_rating'],
                    image_url=row['Image-URL-M'],
                    rating=row['num_ratings'],
                    Y_Pub=row['Year-Of-Publication'],
                    publisher=row['Publisher'],
                ))

            # Insert books in batches
            if len(books_to_create) >= batch_size:
                Book.objects.bulk_create(books_to_create)
                self.stdout.write(f'Inserted {len(books_to_create)} books...')
                books_to_create = []  # Reset the list for the next batch

        # Insert any remaining books
        if books_to_create:
            Book.objects.bulk_create(books_to_create)
            self.stdout.write(f'Inserted the final batch of {len(books_to_create)} books')

        self.stdout.write('Data import complete.')
