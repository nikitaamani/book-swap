import React, { useState } from "react";
import Swal from 'sweetalert2';
import './Rent.css'

const RentBooks = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [rentDuration, setRentDuration] = useState("");
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", image: "https://via.placeholder.com/150" },
    { id: 2, title: "1984", image: "https://via.placeholder.com/150" },
    { id: 3, title: "To Kill a Mockingbird", image: "https://via.placeholder.com/150" },
    { id: 4, title: "Pride and Prejudice", image: "https://via.placeholder.com/150" },
    { id: 5, title: "Moby Dick", image: "https://via.placeholder.com/150" },
    // Add more books if needed
  ]);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleRentRequest = () => {
    if (!rentDuration || isNaN(rentDuration) || rentDuration <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid rental duration!',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Rental Request Submitted!',
        text: `You have successfully rented ${selectedBook.title} for ${rentDuration} days.`,
      });

      setSelectedBook(null);
      setRentDuration("");
    }
  };

  return (
    <div className="rent-container">
      <div className="rent-content">
        {/* Introduction Section */}
        <div className="rent-intro">
          <h1>Welcome to Book Rental</h1>
          <p>Browse through available books for rent and enjoy reading them for a specified duration.</p>
        </div>

        {/* Book Selection Section */}
        {!selectedBook ? (
          <div className="book-grid">
            {books.map((book) => (
              <div
                key={book.id}
                className="book-card"
                onClick={() => handleSelectBook(book)}
              >
                <img src={book.image} alt={book.title} className="book-image" />
                <p className="book-title">{book.title}</p>
              </div>
            ))}
          </div>
        ) : (
          /* Rent Form Section */
          <div className="rent-form">
            <h2>You selected: {selectedBook.title}</h2>
            <p>Enter the number of days you want to rent it:</p>
            <input 
              type="number" 
              placeholder="Number of days" 
              className="rent-input"
              value={rentDuration}
              onChange={(e) => setRentDuration(e.target.value)}
            />
            <button className="rent-button" onClick={handleRentRequest}>
              Submit Rental Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentBooks;
