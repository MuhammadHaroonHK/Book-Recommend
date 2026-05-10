import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# =========================
# LOAD DATASETS
# =========================

books = pd.read_csv(
    "../dataset/Books.csv",
    encoding="latin-1",
    on_bad_lines="skip",
    low_memory=False
)

ratings = pd.read_csv(
    "../dataset/Ratings.csv",
    encoding="latin-1",
    on_bad_lines="skip",
    low_memory=False
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

# =========================
# ACTIVE USERS
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
# POPULAR BOOKS
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

# =========================
# PIVOT TABLE
# =========================

pivot_table = final_ratings.pivot_table(
    index='Book-Title',
    columns='User-ID',
    values='Book-Rating'
)

pivot_table.fillna(0, inplace=True)

# =========================
# COSINE SIMILARITY
# =========================

similarity_scores = cosine_similarity(
    pivot_table
)

# =========================
# RECOMMEND BOOKS
# =========================

def recommend_books(book_name):

    try:

        matching_books = [
            title for title in pivot_table.index
            if book_name.lower() in title.lower()
        ]

        if len(matching_books) == 0:
            return []

        selected_book = matching_books[0]

        index = pivot_table.index.get_loc(
            selected_book
        )

        similar_items = sorted(
            list(enumerate(similarity_scores[index])),
            key=lambda x: x[1],
            reverse=True
        )[1:11]

        recommendations = []

        for item in similar_items:

            temp_df = books[
                books['Book-Title'] == pivot_table.index[item[0]]
            ]

            recommendations.append({
                "title": temp_df['Book-Title'].values[0],
                "author": temp_df['Book-Author'].values[0],
                "image": temp_df['Image-URL-M'].values[0]
            })

        return recommendations

    except Exception as e:

        print("ERROR:", e)

        return []

# =========================
# SEARCH SUGGESTIONS
# =========================

def search_books(query):

    matches = books[
        books['Book-Title'].str.contains(
            query,
            case=False,
            na=False
        )
    ]

    matches = matches['Book-Title'].drop_duplicates()

    return matches.head(10).tolist()

# =========================
# EXPLORE BOOKS
# =========================

def get_books(page=1, limit=20):

    start = (page - 1) * limit
    end = start + limit

    unique_books = books.drop_duplicates(
        'Book-Title'
    )

    paginated_books = unique_books.iloc[start:end]

    result = []

    for _, row in paginated_books.iterrows():

        result.append({
            "title": row['Book-Title'],
            "author": row['Book-Author'],
            "image": row['Image-URL-M']
        })

    return result

# =========================
# TOP RATED BOOKS
# =========================

def get_top_rated_books():

    rating_count = merged_df.groupby(
        'Book-Title'
    ).count()['Book-Rating'].reset_index()

    rating_count.rename(
        columns={
            'Book-Rating': 'Num-Ratings'
        },
        inplace=True
    )

    avg_rating = merged_df.groupby(
        'Book-Title'
    )['Book-Rating'].mean().reset_index()

    avg_rating.rename(
        columns={
            'Book-Rating': 'Avg-Rating'
        },
        inplace=True
    )

    popular_df = rating_count.merge(
        avg_rating,
        on='Book-Title'
    )

    popular_df = popular_df[
        popular_df['Num-Ratings'] >= 50
    ]

    popular_df = popular_df.sort_values(
        'Avg-Rating',
        ascending=False
    )

    popular_df = popular_df.merge(
        books,
        on='Book-Title'
    )

    popular_df = popular_df.drop_duplicates(
        'Book-Title'
    )

    popular_df = popular_df.head(20)

    result = []

    for _, row in popular_df.iterrows():

        result.append({
            "title": row['Book-Title'],
            "author": row['Book-Author'],
            "image": row['Image-URL-M'],
            "rating": round(row['Avg-Rating'], 2)
        })

    return result