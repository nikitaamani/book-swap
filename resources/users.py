# Endpoint for users to register and login
from flask_restful import Resource, reqparse
from models import db, User, ValidationError
from flask_jwt_extended import create_access_token


class RegisterResource(Resource):

    # endpoint for a user to register
    parser = reqparse.RequestParser()
    parser.add_argument(
        'first_name', help='Enter your first name', required=True, type=str)
    parser.add_argument(
        'last_name', help='Enter your last name', required=True, type=str)
    parser.add_argument('email', help='Enter a valid email',
                        required=True, type=str)
    parser.add_argument(
        'password', help='Enter your password', required=True, type=str)
    parser.add_argument(
        'role', help='Role is required', required=True, type=str)

    def post(self):

        # Logic to handle new user registration
        data = self.parser.parse_args()

        # We first check if the email is already in the database
        email = User.query.filter_by(email=data['email']).first()

        if email:
            return {'message': 'Email is already in use', 'status': 'fail'}, 422
        try:
            new_user = User(**data)

            # Adding new user to the database
            db.session.add(new_user)

            # For persisting the new users to the database
            db.session.commit()
            return {'message': 'Registration successful', 'status': 'success'}, 201
        except ValidationError as e:
            return {'message': str(e), 'status': 'fail'}, 422


class LoginResource(Resource):

    '''Class to handle login logic'''

    parser = reqparse.RequestParser()
    parser.add_argument('email', help='Email is reuired',
                        required=True, type=str)
    parser.add_argument(
        'password', help='Input valid password', required=True, type=str)

    def post(self):

        data = self.parser.parse_args()

        if_email = User.query.filter_by(email=data['email']).first()

        if if_email:

            # Checking to confirm if the credentials match
            is_password_match = if_email.check_password(data['password'])

            if is_password_match:
                user_dict = if_email.to_dict()

                # If credentials are valid we give them an access token

                access_token = create_access_token(identity=user_dict['id'])

                return {
                    'message': 'Login successful',
                    "status": 'success',
                    "admin": user_dict,
                    "access_token": access_token
                }, 201

            else:
                return {'message': 'Invalid email/password', 'status': 'fail'}, 403
        else:
            return {'message': 'Invalid email/password', 'status': 'fail'}, 403
