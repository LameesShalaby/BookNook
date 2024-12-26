import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchBookDetails } from "../../redux/bookSlice";
import { addItem } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const BookDetail = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.bookDetails);
  const status = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  // Local state for quantity
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookDetails(bookId));
    }
  }, [dispatch, bookId]);

  const handleAddToCart = () => {
    dispatch(addItem({ ...book, quantity: 1 }));
    toast.success("Book added to cart!");
  };
  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (!book) {
    return <p>Book not found</p>;
  }

  // Calculate total price based on quantity
  const totalPrice = (book.price * quantity).toFixed(2);

  return (
    <div className="pb-12">
      <h3 className="text-3xl font-bold mb-4 text-gray-800 text-center pt-12 pb-4">
        Book Details
      </h3>

      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full rounded"
            />
          </div>
          <div className="flex justify-center flex-col">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-lg font-semibold">{book.author}</p>
            <p className="mt-2 text-gray-600">
              Price: ${book.price.toFixed(2)}
            </p>
            <p className="mt-4 text-gray-800">{book.description}</p>

            {/* Quantity Adjustment */}
            <div className="mt-4 flex items-center space-x-4">
              <p className="text-gray-500">Quantity:</p>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>

            {/* Total Price */}
            <p className="mt-4 text-xl font-bold">
              Total Price: <span className="text-green-600">${totalPrice}</span>
            </p>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Link
            to="/"
            className="mt-4 bg-green-800 hover:bg-green-700 text-white py-2 px-4 rounded w-full text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
