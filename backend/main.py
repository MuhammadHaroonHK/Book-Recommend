from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {
        "message": "Book Recommendation API Running"
    }