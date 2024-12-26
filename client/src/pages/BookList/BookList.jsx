import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/bookSlice";
import BookCard from "../../components/BookCard/BookCard";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const status = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (books) {
      setFilteredBooks(
        books.filter(
          (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [books, searchTerm]);

  const handleSearch = () => {
    if (books) {
      setFilteredBooks(
        books.filter(
          (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto py-6 pb-12">
      {/* Search bar */}
      <div className="mb-6 flex space-x-2">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button onClick={handleSearch} className="px-4 py-2 text-white rounded">
          Search
        </button>
      </div>
      <h3 className="text-3xl font-bold mb-4 text-gray-800 text-center pt-4 pb-8">
        Discover Our Books
      </h3>
      {/* Book grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <p>No books found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
