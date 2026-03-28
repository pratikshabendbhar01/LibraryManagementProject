import React from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [books, setBooks] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  // Change this:
// const API = "http://localhost:5000/api/books";

// To this (Replace with your actual backend URL after Step 2):
const API = "https://server.js.onrender.com/api/books";

  React.useEffect(() => {
    if (isLoggedIn) fetchBooks();
  }, [isLoggedIn]);

  const fetchBooks = () => {
    axios.get(API)
      .then(res => setBooks(res.data))
      .catch(err => console.error("Fetch Error:", err));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("Wrong username or password!");
    }
  };

  const addBook = async () => {
    if (!title || !author || !category || !price) return alert("Fill all fields");
    try {
      await axios.post(API, { title, author, category, price: Number(price) });
      setTitle(""); setAuthor(""); setCategory(""); setPrice("");
      fetchBooks();
    } catch (err) {
      alert("Server error!");
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        {/* TOP OF THE PAGE TITLE */}
        <h1 className="top-page-title">LIBRARY MANAGEMENT</h1>

        <div className="login-container">
          <div className="login-image">
            <img 
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=80" 
              alt="Library" 
            />
          </div>
          <div className="login-box">
            {/* ABOVE THE USERNAME TITLE */}
            <h2 className="login-box-title">Library Login</h2>
            <div className="small-underline"></div>
            
            <form onSubmit={handleLogin}>
              <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-bg">
      <div className="container">
        <h1 className="main-title">📚 Library Management</h1>
        <div className="form-large">
          <input placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <input type="number" placeholder="Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)} />
          <button className="add-btn-large" onClick={addBook}>Add Book</button>
        </div>
        <div className="search-container">
          <h2>Inventory List</h2>
          <input className="search-input" type="text" placeholder="Search books..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <table className="book-table">
          <thead>
            <tr><th>Title</th><th>Author</th><th>Category</th><th>Price</th><th>Action</th></tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book._id}>
                <td style={{fontWeight: 'bold'}}>{book.title}</td>
                <td>{book.author}</td>
                <td><span className="category-tag">{book.category}</span></td>
                <td>₹{book.price}</td>
                <td><button className="delete-btn" onClick={() => deleteBook(book._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="footer-section"><button className="logout-btn" onClick={() => setIsLoggedIn(false)}>Logout Session</button></div>
      </div>
    </div>
  );
}

export default App;