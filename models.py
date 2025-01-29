#Designing with our database schema/blueprint
import re #Regular expressions
from flask_sqlalchemy import SQLAlchemy
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


class User(db.Model,SerializerMixin):
  
  #Table to store users
    __tablename__ = 'users'
    
    id = db.Column(db.Integer,primary_key =True)
    first_name = db.Column(db.String,nullable=False)
    last_name = db.Column(db.String,nullable=False)
    email = db.Column(db.String(120),nullable=False,unique=True)
    password = db.Column(db.String,nullable=False)
    role = db.Column(db.String,nullable=False,unique=True)
    
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


class Book(db.Model,SerializerMixin):

    #Table to store all the book information
    __tablename__ = 'books'
    
    id = db.Column(db.Integer,primary_key=True)
    title = db.Column(db.String,nullable=False)
    description =db.Column(db.String,nullable=False)
    image = db.Column(db.String,nullable=False)
    available = db.Column(db.Boolean,nullable=False)
    number_in_stock = db.Column(db.Integer,nullable=False)
    
