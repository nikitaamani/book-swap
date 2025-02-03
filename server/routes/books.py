from flask import Blueprint, request, jsonify
from model import db, Book, User
from sqlalchemy import text
from datetime import datetime

books_bp = Blueprint('books', __name__)


def get_user_from_request():
    """
    Simple helper to retrieve a user based on an X-User-ID header.
    In production, use proper authentication (tokens or sessions).
    """
    user_id = request.headers.get('X-User-ID')
    if user_id:
        return User.query.get(user_id)
    return None


@books_bp.route('/books', methods=['GET'])
def list_books():
    try:
        sql = text("""
            SELECT b.*, u.username as owner_name
            FROM books b
            LEFT JOIN users u ON b.owner_id = u.id
            ORDER BY b.created_at DESC
        """)
        result = db.session.execute(sql)
        
        books = [{
            'id': row.id,
            'title': row.title,
            'author': row.author,
            'description': row.description,
            'owner_id': row.owner_id,
            'owner_name': row.owner_name,
            'created_at': row.created_at.isoformat()
        } for row in result]
        
        return jsonify(books), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@books_bp.route('/books', methods=['POST'])
def add_book():
    user = get_user_from_request()
    if not user:
        return jsonify({'error': 'Authentication required'}), 401

    try:
        data = request.get_json() or {}
        title = data.get('title')
        author = data.get('author')
        description = data.get('description', '')
        
        if not title or not author:
            return jsonify({'error': 'Title and author are required'}), 400

        sql = text("""
            INSERT INTO books (title, author, description, owner_id, created_at)
            VALUES (:title, :author, :description, :owner_id, :created_at)
            RETURNING id
        """)
        
        result = db.session.execute(sql, {
            'title': title,
            'author': author,
            'description': description,
            'owner_id': user.id,
            'created_at': datetime.utcnow()
        })
        
        db.session.commit()
        book_id = result.fetchone()[0]
        
        return jsonify({'message': 'Book added successfully', 'book_id': book_id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@books_bp.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    user = get_user_from_request()
    if not user:
        return jsonify({'error': 'Authentication required'}), 401

    try:
        # First check if the book exists and belongs to the user
        check_sql = text("""
            SELECT owner_id FROM books WHERE id = :book_id
        """)
        result = db.session.execute(check_sql, {'book_id': book_id})
        book = result.fetchone()
        
        if not book:
            return jsonify({'error': 'Book not found'}), 404
        if book.owner_id != user.id:
            return jsonify({'error': 'You can only update your own books'}), 403

        data = request.get_json() or {}
        
        update_sql = text("""
            UPDATE books 
            SET 
                title = COALESCE(:title, title),
                author = COALESCE(:author, author),
                description = COALESCE(:description, description)
            WHERE id = :book_id
            RETURNING id, title, author, description
        """)
        
        result = db.session.execute(update_sql, {
            'book_id': book_id,
            'title': data.get('title'),
            'author': data.get('author'),
            'description': data.get('description')
        })
        
        db.session.commit()
        updated_book = result.fetchone()
        
        return jsonify({
            'message': 'Book updated successfully',
            'book': {
                'id': updated_book.id,
                'title': updated_book.title,
                'author': updated_book.author,
                'description': updated_book.description
            }
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@books_bp.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    user = get_user_from_request()
    if not user:
        return jsonify({'error': 'Authentication required'}), 401

    try:
        # First check if the book exists and belongs to the user
        check_sql = text("""
            SELECT owner_id FROM books WHERE id = :book_id
        """)
        result = db.session.execute(check_sql, {'book_id': book_id})
        book = result.fetchone()
        
        if not book:
            return jsonify({'error': 'Book not found'}), 404
        if book.owner_id != user.id:
            return jsonify({'error': 'You can only delete your own books'}), 403

        delete_sql = text("""
            DELETE FROM books WHERE id = :book_id
        """)
        
        db.session.execute(delete_sql, {'book_id': book_id})
        db.session.commit()
        
        return jsonify({'message': 'Book deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Additional endpoints with raw SQL queries

@books_bp.route('/books/stats', methods=['GET'])
def get_book_stats():
    try:
        sql = text("""
            SELECT 
                COUNT(*) as total_books,
                COUNT(DISTINCT author) as unique_authors,
                COUNT(DISTINCT owner_id) as total_owners,
                MAX(created_at) as latest_book_date
            FROM books
        """)
        result = db.session.execute(sql)
        row = result.fetchone()
        
        return jsonify({
            'total_books': row.total_books,
            'unique_authors': row.unique_authors,
            'total_owners': row.total_owners,
            'latest_book_date': row.latest_book_date.isoformat() if row.latest_book_date else None
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@books_bp.route('/books/search', methods=['GET'])
def search_books():
    try:
        search_term = request.args.get('q', '')
        sort_by = request.args.get('sort', 'title')
        order = request.args.get('order', 'asc')
        
        # Validate sort parameters to prevent SQL injection
        valid_sort_fields = {'title', 'author', 'created_at'}
        valid_orders = {'asc', 'desc'}
        
        if sort_by not in valid_sort_fields:
            sort_by = 'title'
        if order.lower() not in valid_orders:
            order = 'asc'

        sql = text(f"""
            SELECT b.*, u.username as owner_name
            FROM books b
            LEFT JOIN users u ON b.owner_id = u.id
            WHERE 
                LOWER(b.title) LIKE LOWER(:search)
                OR LOWER(b.author) LIKE LOWER(:search)
                OR LOWER(b.description) LIKE LOWER(:search)
            ORDER BY b.{sort_by} {order}
        """)
        
        result = db.session.execute(sql, {
            'search': f'%{search_term}%'
        })
        
        books = [{
            'id': row.id,
            'title': row.title,
            'author': row.author,
            'description': row.description,
            'owner_id': row.owner_id,
            'owner_name': row.owner_name,
            'created_at': row.created_at.isoformat()
        } for row in result]
        
        return jsonify(books), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@books_bp.route('/books/bulk', methods=['POST'])
def bulk_add_books():
    user = get_user_from_request()
    if not user:
        return jsonify({'error': 'Authentication required'}), 401

    try:
        books_data = request.get_json() or []
        if not books_data or not isinstance(books_data, list):
            return jsonify({'error': 'Invalid data format'}), 400

        sql = text("""
            INSERT INTO books (title, author, description, owner_id, created_at)
            VALUES (:title, :author, :description, :owner_id, :created_at)
        """)
        
        now = datetime.utcnow()
        for book in books_data:
            db.session.execute(sql, {
                'title': book.get('title'),
                'author': book.get('author'),
                'description': book.get('description', ''),
                'owner_id': user.id,
                'created_at': now
            })
        
        db.session.commit()
        return jsonify({'message': f'{len(books_data)} books added successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
