from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from model import (
    recommend_books,
    search_books,
    get_books,
    get_top_rated_books
)

app = FastAPI()

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# HOME
# =========================

@app.get("/")
def home():

    return {
        "message": "Book Recommendation API Running"
    }

# =========================
# RECOMMEND API
# =========================

@app.get("/recommend/{book_name}")
def recommend(book_name: str):

    return {
        "recommendations": recommend_books(book_name)
    }

# =========================
# SEARCH API
# =========================

@app.get("/search/{query}")
def search(query: str):

    return {
        "suggestions": search_books(query)
    }

# =========================
# EXPLORE BOOKS API
# =========================

@app.get("/books")
def books(page: int = 1):

    return {
        "books": get_books(page)
    }

# =========================
# TOP RATED API
# =========================

@app.get("/top-rated")
def top_rated():

    return {
        "books": get_top_rated_books()
    }