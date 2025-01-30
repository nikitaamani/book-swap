#File for seeding the database with dummy data
# File for seeding the database with dummy data
from app import app
from datetime import datetime
from models import db, User, Book, BookList, Review, Wishlist, Transaction, Category
from flask_bcrypt import generate_password_hash


with app.app_context():

    print('Starting to seed the database')

    # To avoid duplicates in the database
    User.query.delete()
    Category.query.delete()
    Book.query.delete()
    BookList.query.delete()
    Review.query.delete()
    Wishlist.query.delete()
    Transaction.query.delete()

    # Seeding the dummy data for the user signing up
    user_one = User(first_name='Nikita', last_name='Amani', email='nikitamani@gmail.com',
                    password=generate_password_hash('password123').decode('utf-8'), role='vendor')

    user_two = User(first_name='Wendo', last_name='Amani', email='wendoamani@gmail.com',
                    password=generate_password_hash('password123').decode('utf-8'), role='buyer')

    db.session.add(user_one)
    db.session.add(user_two)
    db.session.commit()

    print('Two new users added successfully')

    # Seeding the book categories
    category = Category(book_category='romance')

    db.session.add(category)
    db.session.commit()

    print('New book category added')

    # Seeding the dummy data for a newbook
    book = Book(title='Blossoms', author='Pauline', description='this is a book',
                image='https://m.media-amazon.com/images/I/414nrYOa+OL._SY445_SX342_.jpg', available=True, number_in_stock=2, category_id=category.id)

    db.session.add(book)
    db.session.commit()

    print('Added new book')

    # Adding dummy data for users book wishlist
    user_wishlist = Wishlist(user_id=user_two.id, book_id=book.id)

    db.session.add(user_wishlist)
    db.session.commit()

    print('Book added to user\'s wishlist')

    # Adding dummy data for bookilist
    book_list = BookList(user_id=user_two.id, book_id=book.id, price=300,
                         rental_fee=100, listing_type='rent', status='available')

    db.session.add(book_list)
    db.session.commit()

    print('Book list added')

    transaction = Transaction(buyer_id=user_two.id, seller_id=user_one.id,
                              book_listing_id=book_list.id, transaction_date=datetime.now())

    db.session.add(transaction)
    db.session.commit()
    print(
        f'User {user_two.id} has rented  a book {book.id} from vendor {user_one.id}')

    # Seeding data for adding the book review
    review = Review(user_id=user_two.id, book_id=book.id, rating=4)
    db.session.add(review)
    db.session.commit()

    print(f'User {user_two.id} has left a review for {book.id}')
