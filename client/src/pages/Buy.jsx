import React from "react";

import { useEffect, useState } from "react";

const Buy = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div>
      <h1>Buy Books</h1>
      <ul>
        {books
          .filter((book) => book.type === "buy")
          .map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
      </ul>
    </div>
  );
};

export default Buy;
