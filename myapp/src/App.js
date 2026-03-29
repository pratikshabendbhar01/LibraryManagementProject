import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:5000/api/books";

  // Fetch books
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get(API)
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  };

  // Add book
  const addBook = () => {
    if (!title) return alert("Enter book title");

    axios.post(API, { title })
      .then(() => {
        setTitle("");
        fetchBooks();
      })
      .catch(err => console.log(err));
  };

  // Delete book
  const deleteBook = (id) => {
    axios.delete(`${API}/${id}`)
      .then(() => fetchBooks())
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <h1>📚 Library Management</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Enter book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title}
            <button onClick={() => deleteBook(book._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello Library Management</h1>
    </div>
  );
}

export default App;