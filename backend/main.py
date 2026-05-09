from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from model import recommend_books

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

    recommendations = recommend_books(book_name)

    return {
        "book": book_name,
        "recommendations": recommendations
    }