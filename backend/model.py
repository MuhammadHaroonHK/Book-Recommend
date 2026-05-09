import pandas as pd

# Load datasets

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

# Print shapes

print("Books Shape:", books.shape)
print("Ratings Shape:", ratings.shape)

# Print first rows

print(books.head())
print(ratings.head())