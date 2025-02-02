import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './BuyBooks.css';

const BuyBooks = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 20,
      description: 'A novel about the American dream and the excesses of the Jazz Age in the 1920s.',
      category: 'Classic Fiction',
      rating: 4.5,
      reviews: ['Great book!', 'A classic that still resonates today.'],
      imageUrl: '/images/great-gatsby.jpg',
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      price: 15,
      description: 'A dystopian novel about totalitarianism and the dangers of a surveillance state.',
      category: 'Dystopian',
      rating: 4.8,
      reviews: ['Mind-opening read', 'A must-read for anyone who values freedom.'],
      imageUrl: '/images/1984.jpg',
    },
    {
      id: 3,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 18,
      description: 'A gripping tale of racial injustice and moral growth in the American South during the 1930s.',
      category: 'Historical Fiction',
      rating: 4.7,
      reviews: ['Touching story', 'Powerful portrayal of human empathy.'],
      imageUrl: '/images/to-kill-a-mockingbird.jpg',
    },
    {
      id: 4,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      price: 22,
      description: 'A story about teenage angst, alienation, and rebellion told through the eyes of Holden Caulfield.',
      category: 'Literary Fiction',
      rating: 4.3,
      reviews: ['A raw look into teenage life', 'Relatable and thought-provoking.'],
      imageUrl: '/images/catcher-in-the-rye.jpg',
    },
  ]);
  
  const [cart, setCart] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // For handling book detail view
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = (book) => {
    const bookInCart = cart.find((cartBook) => cartBook.id === book.id);
    if (bookInCart) {
      bookInCart.quantity += quantity;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...book, quantity }]);
    }
    Swal.fire({
      icon: 'success',
      title: 'Book Added!',
      text: `${book.title} has been added to your cart.`,
    });
  };

  const handleRemoveFromCart = (bookId) => {
    setCart(cart.filter((item) => item.id !== bookId));
    Swal.fire({
      icon: 'info',
      title: 'Book Removed',
      text: 'The book has been removed from your cart.',
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Books in Cart',
        text: 'Please add books to your cart before proceeding.',
      });
      return;
    }
    // Handle checkout logic here
    Swal.fire({
      icon: 'info',
      title: 'Proceeding to Checkout',
      text: 'Redirecting to checkout page...',
    }).then(() => {
      navigate('/checkout');
    });
  };

  const handleBookClick = (bookId) => {
    const book = books.find((book) => book.id === bookId);
    setSelectedBook(book);
  };

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleCloseDetail = () => {
    setSelectedBook(null); // Close the detailed view
  };

  return (
    <div className="buy-books-container">
      <div className="buy-books-header">
        <h2>Books for Sale</h2>
        <p>Browse our collection of books and add them to your cart.</p>
      </div>

      {/* Main Book List */}
      <div className="books-list">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <div className="book-image">
              <img src={book.imageUrl} alt={book.title} />
            </div>
            <div className="book-details">
              <h4>{book.title}</h4>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Price:</strong> ${book.price}</p>
              <button onClick={() => handleBookClick(book.id)} className="view-details-btn">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Book Detail View (Triggered by clicking a book) */}
      {selectedBook && (
        <div className="book-detail-overlay">
          <div className="book-detail">
            <button onClick={handleCloseDetail} className="close-detail-btn">X</button>
            <div className="book-detail-content">
              <div className="book-detail-image">
                <img src={selectedBook.imageUrl} alt={selectedBook.title} />
              </div>
              <div className="book-detail-info">
                <h3>{selectedBook.title}</h3>
                <p><strong>Author:</strong> {selectedBook.author}</p>
                <p><strong>Category:</strong> {selectedBook.category}</p>
                <p><strong>Description:</strong> {selectedBook.description}</p>
                <div className="book-rating">
                  <strong>Rating:</strong> {selectedBook.rating} <span>⭐</span>
                </div>
                <div className="book-reviews">
                  <h5>Reviews:</h5>
                  <ul>
                    {selectedBook.reviews.map((review, index) => (
                      <li key={index}>{review}</li>
                    ))}
                  </ul>
                </div>
                <div className="book-price">
                  <strong>Price:</strong> ${selectedBook.price}
                </div>
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="quantity-input"
                  />
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(selectedBook)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Section */}
      <div className="cart-section">
        <h3>Your Cart</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty. Add books to your cart to proceed with checkout.</p>
        ) : (
          <div className="cart-items">
            <ul>
              {cart.map((book, index) => (
                <li key={index} className="cart-item">
                  <div className="cart-item-details">
                    <p>{book.title} - ${book.price} x {book.quantity}</p>
                    <button
                      className="remove-from-cart-btn"
                      onClick={() => handleRemoveFromCart(book.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <p>
                <strong>Total:</strong> $
                {cart.reduce((total, book) => total + book.price * book.quantity, 0)}
              </p>
              <button onClick={handleCheckout} className="checkout-btn">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyBooks;
