import React, { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", price: "" });

  const fetchBooks = async () => {
    const res = await API.get("/books");
    setBooks(res.data);
  };

  useEffect(() => { fetchBooks(); }, []);

  const addBook = async () => {
    await API.post("/books", form);
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await API.delete("/books/" + id);
    fetchBooks();
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Author" onChange={(e) => setForm({ ...form, author: e.target.value })} />
      <input placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} />
      <button onClick={addBook}>Add</button>

      <ul>
        {books.map((b) => (
          <li key={b._id}>
            {b.title} - {b.author} - ₹{b.price}
            <button onClick={() => deleteBook(b._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}>Logout</button>
    </div>
  );
}