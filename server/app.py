#Main application set up
from flask import Flask
from flask_restful import Api
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
#The accesss token
ACCESS_TOKEN =timedelta(hours=12)

#Importing the db from the models
from models import db

#Importing our endpoints
from resources.users import RegisterResource,LoginResource
from resources.book import AddBookResource

#Initializing our flask
app = Flask(__name__)

api =Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

#Should be in the .env file
app.config['JWT_SECRET_KEY'] = 'bookswap'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_TOKEN

db.init_app(app)
#For cross-origin-resource
CORS(app)

#The migrate instance
migrate  = Migrate(app,db)

#Bcrypt instance for hashing and storing the passords
bcrpyt  = Bcrypt(app)

#For the JWT
jwt = JWTManager(app)

@app.route('/')
def home():
    return 'Hey from flask'
  
api.add_resource(RegisterResource,'/register')
api.add_resource(LoginResource,'/login')
api.add_resource(AddBookResource,'/addbook')
