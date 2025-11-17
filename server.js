const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 3, title: '1984', author: 'George Orwell' }
];

let nextId = 4;

app.get('/books', (req, res) => {
  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both title and author'
    });
  }

  const newBook = {
    id: nextId++,
    title,
    author
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    message: 'Book added successfully',
    data: newBook
  });
});

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }

  if (title) books[bookIndex].title = title;
  if (author) books[bookIndex].author = author;

  res.status(200).json({
    success: true,
    message: 'Book updated successfully',
    data: books[bookIndex]
  });
});

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }

  const deletedBook = books.splice(bookIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: 'Book deleted successfully',
    data: deletedBook
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('\n=== API Endpoints ===');
  console.log('GET    /books       - Get all books');
  console.log('POST   /books       - Add a new book');
  console.log('PUT    /books/:id   - Update a book by ID');
  console.log('DELETE /books/:id   - Delete a book by ID');
  console.log('====================\n');
});