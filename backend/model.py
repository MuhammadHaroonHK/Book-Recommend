import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# =========================
# LOAD DATASETS
# =========================

books = pd.read_csv(
    "../dataset/Books.csv",
    encoding="latin-1",
    on_bad_lines="skip"
)

ratings = pd.read_csv(
    "../dataset/Ratings.csv",
    encoding="latin-1",
    on_bad_lines="skip"
)

# =========================
# RENAME COLUMNS
# =========================

books.columns = [
    'ISBN',
    'Book-Title',
    'Book-Author',
    'Year-Of-Publication',
    'Publisher',
    'Image-URL-S',
    'Image-URL-M',
    'Image-URL-L'
]

ratings.columns = [
    'User-ID',
    'ISBN',
    'Book-Rating'
]

# =========================
# MERGE DATA
# =========================

merged_df = ratings.merge(
    books,
    on='ISBN'
)

print("Merged Shape:", merged_df.shape)

# =========================
# FILTER ACTIVE USERS
# =========================

user_rating_counts = merged_df.groupby(
    'User-ID'
).count()['Book-Rating']

active_users = user_rating_counts[
    user_rating_counts > 200
].index

filtered_ratings = merged_df[
    merged_df['User-ID'].isin(active_users)
]

# =========================
# FILTER POPULAR BOOKS
# =========================

book_rating_counts = filtered_ratings.groupby(
    'Book-Title'
).count()['Book-Rating']

popular_books = book_rating_counts[
    book_rating_counts >= 50
].index

final_ratings = filtered_ratings[
    filtered_ratings['Book-Title'].isin(popular_books)
]

print("Final Ratings Shape:", final_ratings.shape)

# =========================
# CREATE PIVOT TABLE
# =========================

pivot_table = final_ratings.pivot_table(
    index='Book-Title',
    columns='User-ID',
    values='Book-Rating'
)

pivot_table.fillna(0, inplace=True)

print("Pivot Table Shape:", pivot_table.shape)

# =========================
# COSINE SIMILARITY
# =========================

similarity_scores = cosine_similarity(
    pivot_table
)

print("Similarity Shape:", similarity_scores.shape)

# =========================
# RECOMMEND FUNCTION
# =========================

def recommend_books(book_name):

    try:

        index = pivot_table.index.get_loc(book_name)

        similar_items = sorted(
            list(enumerate(similarity_scores[index])),
            key=lambda x: x[1],
            reverse=True
        )[1:6]

        recommendations = []

        for item in similar_items:

            book_data = {}

            temp_df = books[
                books['Book-Title'] == pivot_table.index[item[0]]
            ]

            book_data['title'] = temp_df[
                'Book-Title'
            ].values[0]

            book_data['author'] = temp_df[
                'Book-Author'
            ].values[0]

            book_data['image'] = temp_df[
                'Image-URL-M'
            ].values[0]

            recommendations.append(book_data)

        return recommendations

    except:
        return []


# =========================
# TEST RECOMMENDATION
# =========================

test_book = "Harry Potter and the Sorcerer's Stone (Harry Potter (Paperback))"

results = recommend_books(test_book)

print("\nRecommendations:\n")

for book in results:

    print(book['title'])