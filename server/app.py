from flask import Flask, jsonify
from config import Config
from model import db , User, Book, Swap
from routes.auth import auth_bp
from routes.books import books_bp
from routes.swaps import swaps_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    
    db.init_app(app)

    # Register blueprints with distinct URL prefixes
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(books_bp, url_prefix='/api/books')
    app.register_blueprint(swaps_bp, url_prefix='/api/swaps')

    # Add a root route (no template)
    @app.route('/')
    def home():
        return 'Welcome to the Book Swap Hub!'

    # Add error handlers (return JSON error messages instead)
    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({'error': 'Page not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return jsonify({'error': 'Internal server error'}), 500

    @app.shell_context_processor
    def make_shell_context():
        from models import User, Book, Swap
        return {'db': db, 'User': User, 'Book': Book, 'Swap': Swap}

    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        # Create all database tables
        db.create_all()
    app.run(debug=True)
