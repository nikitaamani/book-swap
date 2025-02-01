# Designing with our database schema/blueprint
import re  # Regular expressions
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from flask_bcrypt import check_password_hash, generate_password_hash

# Define naming convention for database schema
convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)
db = SQLAlchemy(metadata=metadata)


class ValidationError(Exception):

    def __init__(self, message):
        self.message = message
        super().__init__(self.message)


class User(db.Model, SerializerMixin):

  # Table to store users
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False, )

    serializer_rules = ('-password',)
    # Defining relationships
    book_listed = db.relationship(
        'BookList', back_populates='user', cascade='all , delete-orphan')
    wishlist = db.relationship(
        'Wishlist', back_populates='user', cascade='all , delete-orphan')
    reviews = db.relationship(
        'Review', back_populates='user', cascade='all, delete-orphan')
    transactions = db.relationship(
        'Transaction', back_populates='buyer', foreign_keys="Transaction.buyer_id")

    @validates('email')
    def validate_email(self, key, email):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValidationError('Please enter a valid email address.')
        return email

    # Checking the strength of the password
    @validates('password')
    def password_strength(self, key, password):

        # Regular expressions for uppercase,lowercase and numeric characters
        if len(password) < 8:
            raise ValidationError(
                'Password is too short, it should be have minimum of 8 characters'
            )
        if not re.search('[A-Z]', password):
            raise ValidationError(
                'Password must contain at least one uppercase letter'
            )
        if not re.search('[a-z]', password):
            raise ValidationError(
                'Password must contain at least on lowercase letter'
            )
        if not re.search('[0-9]', password):
            raise ValidationError(
                'Password must contain at least on number'
            )

         # Hashing the password before doing the validation
        return generate_password_hash(password).decode('utf-8')

    # Hashing the password before saving it to our database

    def check_password(self, plain_password):
        return check_password_hash(self.password, plain_password)


class Category(db.Model, SerializerMixin):

    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    # e.g horror,romance.fantasies
    book_category = db.Column(db.String(80), nullable=False)

    # Defining the relationship between the book and a category it belongs
    book = db.relationship('Book', back_populates='category', cascade='all, delete-orphan')


class Book(db.Model, SerializerMixin):

    # Table to store all the book information
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=True)
    description = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    available = db.Column(db.Boolean, default=True, nullable=False)
    number_in_stock = db.Column(db.Integer, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(
        'categories.id'), nullable=True)
    
    #Adding serializer rules to avoid recursion depth
    serialize_only =('title','author','description','image','available','number_in_stock','category_id')

    # Defining relationships
    listings = db.relationship(
        'BookList', back_populates='book', cascade='all, delete-orphan')
    reviews = db.relationship(
        'Review', back_populates='book', cascade='all, delete-orphan')
    wishlisted_by = db.relationship(
        'Wishlist', back_populates='book', cascade="all, delete-orphan")
    category = db.relationship(
        'Category', back_populates='book')


class Wishlist(db.Model, SerializerMixin):

    # Table to store the bookmarks/wishlist made by the users
    __tablename__ = 'wishlists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    
    serialize_only=('user_id','book_id',)

    # Defining the relationship
    user = db.relationship('User', back_populates='wishlist')
    book = db.relationship('Book', back_populates='wishlisted_by')


class BookList(db.Model, SerializerMixin):

    # Table to keep track of the booklistings
    __tablename__ = 'booklistings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey(
        'books.id'), nullable=False)
    price = db.Column(db.Float, nullable=False)
    rental_fee = db.Column(db.Float, nullable=False)
    # Is it up for rent/buying
    listing_type = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String, default='available')

    #Serializer
    serialize_only = ('user_id','book_id','price','rental_fee','listing_type','status')
    
    # Relationships
    user = db.relationship('User', back_populates='book_listed')
    book = db.relationship('Book', back_populates='listings')


class Transaction(db.Model, SerializerMixin):

    # Table to keep track of the transactions made
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=True)
    seller_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=True)
    book_listing_id = db.Column(db.Integer, db.ForeignKey(
        'booklistings.id'), nullable=False)
    # transaction_type = db.Column(db.String(20), nullable=False)
    transaction_date = db.Column(
        db.DateTime, default=datetime.now(), nullable=False)

    # Defining the relationships
    buyer = db.relationship('User', foreign_keys=[buyer_id], back_populates='transactions')
    seller = db.relationship('User', foreign_keys=[seller_id])
    book_listing = db.relationship('BookList')


class Review(db.Model, SerializerMixin):

    # Table to store the reviews made by users to a certain book and vice versa
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    
    
    #Serializer rules
    serialize_only= ('user_id','book_id','rating')

    # Defining the relationships
    book = db.relationship('Book', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')
