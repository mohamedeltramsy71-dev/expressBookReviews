const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

// Register new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });
  if (isValid(username))
    return res.status(400).json({ message: "Username already exists" });
  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
});

// Get all books using async/await
public_users.get('/', async (req, res) => {
  try {
    const response = await new Promise((resolve) => resolve(books));
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Get book by ISBN using Promise
public_users.get('/isbn/:isbn', (req, res) => {
  new Promise((resolve, reject) => {
    const book = books[req.params.isbn];
    if (book) resolve(book);
    else reject("Book not found");
  })
    .then(book => res.status(200).json(book))
    .catch(err => res.status(404).json({ message: err }));
});

// Get books by author using async/await
public_users.get('/author/:author', async (req, res) => {
  try {
    const author = req.params.author.toLowerCase();
    const result = Object.values(books).filter(
      b => b.author.toLowerCase().includes(author)
    );
    if (result.length === 0)
      return res.status(404).json({ message: "No books found" });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Get books by title using Promise
public_users.get('/title/:title', (req, res) => {
  new Promise((resolve, reject) => {
    const title = req.params.title.toLowerCase();
    const result = Object.values(books).filter(
      b => b.title.toLowerCase().includes(title)
    );
    if (result.length > 0) resolve(result);
    else reject("No books found");
  })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(404).json({ message: err }));
});

// Get book review
public_users.get('/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  return res.status(200).json(book.reviews);
});

module.exports.general = public_users;