from flask import Blueprint, request, jsonify
from model import db, Swap, Book, User

swaps_bp = Blueprint('swaps', __name__)


def get_user_from_request():
    """
    Retrieve a user based on an X-User-ID header.
    """
    user_id = request.headers.get('X-User-ID')
    if user_id:
        return User.query.get(user_id)
    return None


@swaps_bp.route('/swaps', methods=['POST'])
def propose_swap():
    """
    Propose a new swap.
    Expects JSON with:
      - requested_book_id: The ID of the book the user wants.
      - offered_book_id: The ID of the book the user is offering.
    """
    user = get_user_from_request()
    if not user:
        return jsonify({'error': 'Authentication required'}), 401

    data = request.get_json() or {}
    requested_book_id = data.get('requested_book_id')
    offered_book_id = data.get('offered_book_id')
    if not requested_book_id or not offered_book_id:
        return jsonify({'error': 'Both requested_book_id and offered_book_id are required'}), 400

    requested_book = Book.query.get(requested_book_id)
    offered_book = Book.query.get(offered_book_id)

    if not requested_book or not offered_book:
        return jsonify({'error': 'Invalid book IDs'}), 400

    # Ensure the offered book belongs to the authenticated user.
    if offered_book.owner_id != user.id:
        return jsonify({'error': 'You can only offer your own books'}), 403

    swap = Swap(
        requester_id=user.id,
        requested_book_id=requested_book_id,
        offered_book_id=offered_book_id,
        status='pending'
    )
    db.session.add(swap)
    db.session.commit()
    return jsonify({'message': 'Swap proposal created', 'swap_id': swap.id}), 201


@swaps_bp.route('/swaps', methods=['GET'])
def list_swaps():
    """
    List swaps where the user is either the requester or the owner of the requested book.
    """
    user = get_user_from_request()
    if not user:
        return jsonify({'error': 'Authentication required'}), 401

    # Filter swaps where the user is involved.
    swaps = Swap.query.filter(
        (Swap.requester_id == user.id) |
        (Swap.requested_book.has(owner_id=user.id))
    ).all()

    result = []
    for swap in swaps:
        result.append({
            'id': swap.id,
            'requester_id': swap.requester_id,
            'requested_book_id': swap.requested_book_id,
            'offered_book_id': swap.offered_book_id,
            'status': swap.status,
            'created_at': swap.created_at.isoformat()
        })
    return jsonify(result), 200


@swaps_bp.route('/swaps/<int:swap_id>', methods=['PUT'])
def respond_swap(swap_id):
    """
    Respond to a swap proposal.
    Expects JSON with:
      - action: 'accept' or 'reject'
    Only the owner of the requested book may respond.
    """
    user = get_user_from_request()
    if not user:
        return jsonify({'error': 'Authentication required'}), 401

    swap = Swap.query.get_or_404(swap_id)

    # Verify that the user owns the requested book.
    if swap.requested_book.owner_id != user.id:
        return jsonify({'error': 'You are not authorized to respond to this swap'}), 403

    data = request.get_json() or {}
    action = data.get('action')
    if action not in ['accept', 'reject']:
        return jsonify({'error': 'Invalid action. Must be "accept" or "reject"'}), 400

    swap.status = 'accepted' if action == 'accept' else 'rejected'
    db.session.commit()
    return jsonify({'message': f'Swap {action}ed successfully'}), 200
