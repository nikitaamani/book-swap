#Endpoint for performing all crud operations to the books categories
from flask_restful import Resource,reqparse
from models import db,Category

class CategoryResource(Resource):
     # endpoint for a user to register
    parser = reqparse.RequestParser()
    parser.add_argument(
        'book_category', help='Enter the book title', required=True, type=str)
   
    
    def post(self):
        data = self.parser.parse_args()
        category = Category.query.filter_by(book_category=data['book_category']).first()
       
        #Checking if the book category even exists in our database before readding it into our db
        if category:
            return {'message':'Book category already available'}
        else:
           

            new_category = Category(**data)

            db.session.add(new_category)

            db.session.commit()

            return {'message': 'Category added successfully', 'status': 'success'}, 201
          
     # Endpoint for fetching all the books
    def get(self, id=None):
        
        if id == None:
            all_books = Category.query.all()

            # Using the list comprehension method
            all_data = [category.to_dict() for category in all_books]

            return {'categories': all_data}

        else:
           
            category = Category.query.filter_by(id=id).first()

           
            if category == None:
                return {'message': 'Category not found'}, 404

            return category.to_dict()
    
    def delete(self,id):
        category = Category.query.filter_by(id=id).first()
        
        if not category:
            return {'message':'Category not found'}
        
        db.session.delete(category)
        db.session.commit()
        
        return {'message':'Book category removed '}