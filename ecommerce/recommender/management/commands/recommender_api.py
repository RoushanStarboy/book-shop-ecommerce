from flask import Flask, jsonify, request
import numpy as np
import pandas as pd
import pickle, os
# ... other imports from your Colab notebook ...

app = Flask(__name__)

# ... load your rating_matrix, similarity_scores, and popular_df ...
popular_df = pickle.load(open(os.path.join('data', 'popular.pkl'), 'rb'))
rating_matrix = pickle.load(open(os.path.join('data', 'rating_matrix.pkl'), 'rb'))
similarity_scores = pickle.load(open(os.path.join('data', 'similarity_scores.pkl'), 'rb'))
books = pickle.load(open(os.path.join('data', 'books.pkl'), 'rb'))

def recommend_popular(num_recommendations=10):

    top_books = popular_df.sort_values('avg_rating', ascending=False).head(num_recommendations)
    top_book_ids = top_books['Book-Title'].tolist()
    return top_book_ids


def recommend_collaborative(book_name):


    index = np.where(rating_matrix.index==book_name)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])),key=lambda x:x[1],reverse=True)[1:11]

    recommendations = []
    for i in similar_items:
        item = []
        temp_df = books[books['Book-Title'] == rating_matrix.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['price'].values))

        recommendations.append(item)

    return recommendations


@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    recommendation_type = request.json.get('type', 'collaborative') # Get type from request
    user_id = request.json.get('userId')
    book_name = request.json.get('bookName')

    if recommendation_type == 'popular':
        recommendations = recommend_popular()
    elif recommendation_type == 'collaborative':
        recommendations = recommend_collaborative(book_name)
    else:
        return jsonify({'error': 'Invalid recommendation type'}), 400

    return jsonify(recommendations)
