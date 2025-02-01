# Endpoint for performin CRUD operations for the books
from flask_restful import Resource, reqparse
from models import db, Book


class BooksStoreResource(Resource):

    # endpoint for a user to register
    parser = reqparse.RequestParser()
    parser.add_argument(
        'title', help='Enter the book title', required=True, type=str)
    parser.add_argument(
        'author', help='Enter the book author', required=True, type=str)
    parser.add_argument(
        'description', help='Enter book description', required=True, type=str)
    parser.add_argument('image', help='Upload an image for the book',
                        required=True, type=str)
    parser.add_argument(
        'available', help='Enter if the book is available', required=True, type=bool)
    parser.add_argument(
        'number_in_stock', help='Enter the number of books present', required=True, type=int)
    parser.add_argument(
        'categories.id', help='Ennter the category of books ', required=True, type=int)

    def post(self):

        data = self.parser.parse_args()

        new_book = Book(**data)

        db.session.add(new_book)

        db.session.commit()

        return {'message': 'Book added successfully', 'status': 'success'}, 201

    # Endpoint for fetching all the books
    def get(self, id=None):
        # The endpoint to perform the get requests

        # If an id is not passed we query all the books
        if id == None:
            all_books = Book.query.all()

            # Using the list comprehension method
            all_data = [book.to_dict() for book in all_books]

            return {'books': all_data}

        else:
            # If an id is passed we get the id of the book given
            one_book = Book.query.filter_by(id=id).first()

            # Checking if of the given id even exists
            if one_book == None:
                return {'message': 'Book not found'}, 404

            return one_book.to_dict()

    def patch(self, id):

        # This the endpoint for allowing editing a given resource
        data = self.parser.parse_args()

        book = Book.query.filter_by(id=id).first()

        if book == None:
            return {'message': 'Book not found'}, 404

        for key in data.keys():
            setattr(book, key, data[key])

        db.session.commit()

        return {'message': 'Book details updated successfully'}

    def delete(self, id):
        # The endpoint to delete the book instance from our database
        book = Book.query.filter_by(id=id).first()

        if book == None:
            return {'message': 'Book not found'}, 404

        db.session.delete(book)

        db.session.commit()

        return {'message': "Book removed successfully"}
