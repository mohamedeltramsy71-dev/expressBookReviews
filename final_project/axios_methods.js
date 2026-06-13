const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Task 10: Get all books using async/await
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log("Task 10 - All Books:");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.error(err.message);
  }
}

// Task 11: Search by ISBN using Promise
function getBookByISBN(isbn) {
  axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then(response => {
      console.log("Task 11 - Book by ISBN:");
      console.log(JSON.stringify(response.data, null, 2));
    })
    .catch(err => console.error(err.message));
}

// Task 12: Search by Author using async/await
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    console.log("Task 12 - Books by Author:");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.error(err.message);
  }
}

// Task 13: Search by Title using Promise
function getBooksByTitle(title) {
  axios.get(`${BASE_URL}/title/${title}`)
    .then(response => {
      console.log("Task 13 - Books by Title:");
      console.log(JSON.stringify(response.data, null, 2));
    })
    .catch(err => console.error(err.message));
}

// Run all
getAllBooks();
getBookByISBN(1);
getBooksByAuthor('Austen');
getBooksByTitle('Things');