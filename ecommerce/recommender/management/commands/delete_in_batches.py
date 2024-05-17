from django.core.management.base import BaseCommand
from django.db import transaction
from recommender.models import Book  # Change to your actual app and model name

class Command(BaseCommand):
    help = 'Deletes entries from Book in batches'

    def handle(self, *args, **options):
        batch_size = 5000  # Adjust the batch size based on your database capabilities
        model_ids = Book.objects.all().values_list('id', flat=True)[:batch_size]

        while model_ids:
            with transaction.atomic():  # Use a transaction to ensure atomicity of the delete operation
                Book.objects.filter(id__in=list(model_ids)).delete()
                self.stdout.write(f'Deleted {len(model_ids)} entries')

            # Fetch the next batch of IDs
            model_ids = Book.objects.all().values_list('id', flat=True)[:batch_size]

        self.stdout.write('Deletion complete')
