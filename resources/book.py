#Endpoint for performin CRUD operations for the books
from flask_restful import Resource,reqparse
from models import db,Book


class AddBookResource(Resource):

    # endpoint for a user to register
    parser = reqparse.RequestParser()
    parser.add_argument(
        'title', help='Enter the book title', required=True, type=str)
    parser.add_argument(
        'description', help='Enter book description', required=True, type=str)
    parser.add_argument('image', help='Upload an image for the book',
                        required=True, type=str)
    parser.add_argument(
        'available', help='Enter if the book is available', required=True, type=bool)
    parser.add_argument(
        'number_in_stock', help='Enter the number of books present', required=True, type=int)
    
    
    def post(self):

        data = self.parser.parse_args()
        
        new_book = Book(**data)
        
        db.session.add(new_book)
        
        db.session.commit()
        
        return {'message':'Book added successfully','status':'success'},201