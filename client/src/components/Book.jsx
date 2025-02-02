import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate
import './Book.css';

const Book = () => {
  const navigate = useNavigate(); // Updated to useNavigate
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'Available' },
    { id: 2, title: '1984', author: 'George Orwell', status: 'Unavailable' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'Available' },
  ]);
  const [selectedBook, setSelectedBook] = useState(null);

  // Handle book selection
  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  // Confirm the book selection
  const handleConfirmSelection = () => {
    if (selectedBook) {
      setBooks([...books, { ...selectedBook, status: 'Available' }]); // Add the selected book to the list
      navigate('/'); // Use navigate instead of history.push
    }
  };

  return (
    function BotCollection({ bots, handleClick, handleDelete }) {
      return (
        <div>
          <h2>All Bots</h2>
          <ul>
            {bots.map((bot) => (
              <li key={bot.id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
                <img src={bot.avatar_url} alt={bot.name} style={{ width: '100px', height: '100px' }} />
                <p><strong>Name:</strong> {bot.name}</p>
                <p><strong>Health:</strong> {bot.health}</p>
                <p><strong>Damage:</strong> {bot.damage}</p>
                <p><strong>Armor:</strong> {bot.armor}</p>
                <p><strong>Class:</strong> {bot.bot_class}</p>
                <p><strong>Catchphrase:</strong> {bot.catchphrase}</p>
                <p><strong>Created At:</strong> {new Date(bot.created_at).toLocaleDateString()}</p>
                <p><strong>Updated At:</strong> {new Date(bot.updated_at).toLocaleDateString()}</p>
                <button onClick={() => handleClick(bot.id)}>Add to Army</button>
                <button onClick={() => handleDelete(bot.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }  );
};

export default Book;
