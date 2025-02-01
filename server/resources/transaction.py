#Endpoint for performing all transactions
from flask_restful import Resource,reqparse
from models import db,Transaction


class TransactionResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        'buyer_id', help='Enter the book title', required=True, type=int)
    parser.add_argument(
        'seller_id', help='Enter the book title', required=True, type=int)
    parser.add_argument(
        'book_listing_id', help='Enter the book title', required=True, type=int)
    # parser.add_argument(
    #     'book_listing_id', help='Enter the book title', required=True, type=int)