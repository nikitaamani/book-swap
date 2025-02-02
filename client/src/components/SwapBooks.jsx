import React, { useState } from "react";
import './SwapBooks.css'
import Swal from "sweetalert2";

const SwapBooks = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [swapFormVisible, setSwapFormVisible] = useState(false);
  const [swapRequest, setSwapRequest] = useState("");
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", image: "https://via.placeholder.com/150" },
    { id: 2, title: "1984", image: "https://via.placeholder.com/150" },
    { id: 3, title: "To Kill a Mockingbird", image: "https://via.placeholder.com/150" },
    { id: 4, title: "Pride and Prejudice", image: "https://via.placeholder.com/150" },
    { id: 5, title: "Moby Dick", image: "https://via.placeholder.com/150" },
    { id: 6, title: "War and Peace", image: "https://via.placeholder.com/150" },
    { id: 7, title: "The Catcher in the Rye", image: "https://via.placeholder.com/150" },
    { id: 8, title: "The Hobbit", image: "https://via.placeholder.com/150" },
    { id: 9, title: "Little Women", image: "https://via.placeholder.com/150" },
    { id: 10, title: "Crime and Punishment", image: "https://via.placeholder.com/150" },
    { id: 11, title: "The Odyssey", image: "https://via.placeholder.com/150" },
    { id: 12, title: "Great Expectations", image: "https://via.placeholder.com/150" },
    { id: 13, title: "Jane Eyre", image: "https://via.placeholder.com/150" },
    { id: 14, title: "Brave New World", image: "https://via.placeholder.com/150" },
    { id: 15, title: "Wuthering Heights", image: "https://via.placeholder.com/150" },
    { id: 16, title: "The Scarlet Letter", image: "https://via.placeholder.com/150" },
    { id: 17, title: "Dracula", image: "https://via.placeholder.com/150" },
    { id: 18, title: "Frankenstein", image: "https://via.placeholder.com/150" },
    { id: 19, title: "Anna Karenina", image: "https://via.placeholder.com/150" },
    { id: 20, title: "Les Misérables", image: "https://via.placeholder.com/150" },
    { id: 21, title: "The Picture of Dorian Gray", image: "https://via.placeholder.com/150" },
    { id: 22, title: "Don Quixote", image: "https://via.placeholder.com/150" },
    { id: 23, title: "Fahrenheit 451", image: "https://via.placeholder.com/150" },
    { id: 24, title: "The Brothers Karamazov", image: "https://via.placeholder.com/150" },
    { id: 25, title: "Slaughterhouse-Five", image: "https://via.placeholder.com/150" },
    { id: 26, title: "A Tale of Two Cities", image: "https://via.placeholder.com/150" },
    { id: 27, title: "The Lord of the Rings", image: "https://via.placeholder.com/150" },
    { id: 28, title: "Catch-22", image: "https://via.placeholder.com/150" },
    { id: 29, title: "The Alchemist", image: "https://via.placeholder.com/150" },
    { id: 30, title: "The Count of Monte Cristo", image: "https://via.placeholder.com/150" },
    { id: 31, title: "The Shining", image: "https://via.placeholder.com/150" },
    { id: 32, title: "Dune", image: "https://via.placeholder.com/150" },
    { id: 33, title: "The Road", image: "https://via.placeholder.com/150" },
    { id: 34, title: "Beloved", image: "https://via.placeholder.com/150" },
    { id: 35, title: "Invisible Man", image: "https://via.placeholder.com/150" },
    { id: 36, title: "The Grapes of Wrath", image: "https://via.placeholder.com/150" },
    { id: 37, title: "One Hundred Years of Solitude", image: "https://via.placeholder.com/150" },
    { id: 38, title: "The Sun Also Rises", image: "https://via.placeholder.com/150" },
    { id: 39, title: "Rebecca", image: "https://via.placeholder.com/150" },
    { id: 40, title: "The Goldfinch", image: "https://via.placeholder.com/150" },
    { id: 41, title: "The Book Thief", image: "https://via.placeholder.com/150" },
    { id: 42, title: "The Night Circus", image: "https://via.placeholder.com/150" },
    { id: 43, title: "Where the Crawdads Sing", image: "https://via.placeholder.com/150" },
    { id: 44, title: "The Silent Patient", image: "https://via.placeholder.com/150" },
    { id: 45, title: "Circe", image: "https://via.placeholder.com/150" },
    { id: 46, title: "The House of the Spirits", image: "https://via.placeholder.com/150" },
    { id: 47, title: "The Shadow of the Wind", image: "https://via.placeholder.com/150" },
    { id: 48, title: "Cloud Atlas", image: "https://via.placeholder.com/150" },
    { id: 49, title: "Shantaram", image: "https://via.placeholder.com/150" },
    { id: 50, title: "The Name of the Wind", image: "https://via.placeholder.com/150" }
  ]);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setSwapFormVisible(true);
  };
  const handleSwapRequest = () => {
    if (swapRequest.trim() === "") {
      // If the input is empty, show an error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a book title to swap!',
      });
    } else {
      // Display a sweet success message
      Swal.fire({
        icon: 'success',
        title: 'Swap Request Submitted!',
        text: `You want to swap ${selectedBook.title} with ${swapRequest}.`,
      });

      // Reset the form after submission
      setSwapFormVisible(false);
      setSwapRequest("");
    }
};
return (
    <div className="swap-container">
      <div className="swap-content">
        {/* Introduction Section */}
        <div className="swap-intro">
          <h1>Welcome to Book Swap</h1>
          <p>Exchange your books with others and discover new reads effortlessly. Browse available books and start swapping today!</p>
        </div>
        
        {/* Book Selection Section */}
        {!swapFormVisible ? (
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
          /* Swap Form Section */
          <div className="swap-form">
            <h2>You selected: {selectedBook.title}</h2>
            <p>Enter the book you want to swap with:</p>
            <input 
              type="text" 
              placeholder="Enter book title" 
              className="swap-input"
              value={swapRequest}
              onChange={(e) => setSwapRequest(e.target.value)} // Set the entered book title
            />
            <button className="swap-button" onClick={handleSwapRequest}>
              Submit Swap Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapBooks;