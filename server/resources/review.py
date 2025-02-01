# Endpoint for adding reviews and deleting reviews
from flask_restful import Resource, reqparse
from models import db, Review


class ReviewResource(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument(
        'user_id', help='Enter the book title', required=True, type=int)
    parser.add_argument(
        'book_id', help='Enter the book title', required=True, type=int)
    parser.add_argument(
        'rating', help='Enter the book title', required=True, type=int)

    user_id = 1
    book_id = 1

    def post(self):
        data = self.parser.parse_args()

        book_review = Review(**data)

        db.session.add(book_review)
        db.session.commit()

        return {'message': 'Thanks for leaving a review'}
    
    def get(self, id=None):
        
        if id == None:
            all_reviews = Review.query.all()

            # Using the list comprehension method
            all_data = [reviews.to_dict() for reviews in all_reviews]

            return {'reviews': all_data}

        else:
           
            review = Review.query.filter_by(id=id).first()

           
            if review == None:
                return {'message': 'Reviews not found'}, 404

            return review.to_dict()

    def delete(self, id):
        review = Review.query.filter_by(id=id).first()

        if review == None:
            return {'message': 'No review to delete'}

        db.session.delete(review)

        db.session.commit()

        return {'message': 'Review deleted successfuly'}
