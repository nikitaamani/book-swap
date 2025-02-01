# Endpoint for users to add books to their wishist and even delete them
from flask_restful import Resource, reqparse
from models import db, Wishlist


class WishlistResource(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument(
        'user_id', help='User id is required', required=True, type=int)
    parser.add_argument(
        'book_id', help='Book id is required', required=True, type=str)

    # We must check if the book exists before adding to the users wishlist
    def post(self):

        data = self.parser.parse_args()
        # I'll grab this from the jwt
        user_id = 1
        book_id = 1
        if user_id and book_id:
            new_wishlist = Wishlist(**data)

            db.session.add(new_wishlist)

            db.session.commit()

            return {'message': 'Book added to your wishlist'}
          
      # Endpoint for fetching all the books
    def get(self, id=None):
        # The endpoint to perform the get requests

        # If an id is not passed we query all the wishlist made by the users
        if id == None:
            all_wishlists = Wishlist.query.all()

            # Using the list comprehension method for faster and optimized query
            all_data = [wishlist.to_dict() for wishlist in all_wishlists]

            return {'wishlists': all_data}

        else:
            # If an id is passed we get the id of the wihslist given
            one_wishlist = Wishlist.query.filter_by(id=id).first()

            # Checking if of the given id even exists
            if one_wishlist == None:
                return {'message': 'Wishlist not found'}, 404

            return one_wishlist.to_dict()

    def delete(self, id):

        # We check if the user even has the book in their wishlist
        wishlist = Wishlist.query.filter_by(id=id).first()

        if not wishlist:
            return {'message': 'No book in your wishlist'}

        db.session.delete(wishlist)
        db.session.commit()
