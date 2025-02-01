#Endpoint for adding the booklists
from flask_restful import Resource,reqparse
from models import db,BookList

class BookListResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        'user_id', help='Enter the book title', required=True, type=int)
    parser.add_argument(
        'book_id', help='Enter the book title', required=True, type=int)
    parser.add_argument(
        'price', help='Enter the book title', required=True, type=int)
    parser = reqparse.RequestParser()
    parser.add_argument(
        'rental_fee', help='Enter the book title', required=True, type=int)
    parser.add_argument(
        'listing_type', help='Enter the book title', required=True, type=int)
    parser.add_argument(
        'status', help='Enter the book title', required=True, type=int)
    
    def post(self):
        data = self.parser.parse_args()
        
        new_book_list = BookList(**data)
        
        db.session.add(new_book_list)
        db.session.commit()
        
        return {'message':'Add new book listing'}
   

    def get(self,id=None):
        if id == None:
            book_list = BookList.query.all()
            
            all_books = [book.to_dict() for book  in book_list]
            
            return {'bookslist':all_books}
        else:
            book = BookList.query.filter_by(id=id).first()
            
            if book == None:
                return {'message':'Book list is not  found'}
            return book.to_dict()
