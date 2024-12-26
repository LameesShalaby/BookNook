import Book from "../models/book.js";

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

// Get a single book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching book" });
  }
};

// Add a new book
export const addBook = async (req, res) => {
  const { title, author, price, description, coverImage } = req.body;
  try {
    const newBook = new Book({ title, author, price, description, coverImage });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: "Error adding book" });
  }
};

// Update a book by ID
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating book" });
  }
};

// Delete a book by ID
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book) {
      res.json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
};

// Fetch book details
export const getBookDetails = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching book details' });
    }
  };
  
  // Fetch books by genre or author
  export const getBooksByGenreOrAuthor = async (req, res) => {
    try {
      const { genre, author } = req.query;
      const query = {};
      if (genre) query.genre = genre;
      if (author) query.author = author;
      
      const books = await Book.find(query);
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching books' });
    }
  };