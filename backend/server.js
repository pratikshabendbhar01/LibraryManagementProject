const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ In-memory database (correct place)
let books = [];
let id = 1;

// GET all books
app.get("/api/books", (req, res) => {
  console.log("Current books:", books);
  res.json(books);
});

// ADD book
app.post("/api/books", (req, res) => {
  const { title, author, category, price } = req.body;

  // ✅ Validation
  if (!title || !author || !category || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newBook = {
    _id: id++,
    title,
    author,
    category,
    price: Number(price) // ✅ ensure number
  };

  books.push(newBook);
  res.status(201).json(newBook); // ✅ better status
});

// DELETE book
app.delete("/api/books/:id", (req, res) => {
  const bookId = Number(req.params.id);

  const exists = books.some(b => b._id === bookId);
  if (!exists) {
    return res.status(404).json({ message: "Book not found" });
  }

  books = books.filter(book => book._id !== bookId);
  res.json({ message: "Book deleted" });
});

// UPDATE book
app.put("/api/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const book = books.find(b => b._id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const { title, author, category, price } = req.body;

  // ✅ Validation
  if (!title || !author || !category || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  book.title = title;
  book.author = author;
  book.category = category;
  book.price = Number(price);

  res.json(book);
});

// LOGIN (basic demo)
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));