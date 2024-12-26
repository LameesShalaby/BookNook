import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ ...book, quantity: 1 }));
    toast.success("Book added to cart!");
  };

  return (
    <div className="p-4 border rounded shadow-lg">
      <Link to={`/books/${book._id}`}>
        <img
          src={book.coverImage}
          alt={`${book.title} cover`}
          className="w-full h-48 object-cover rounded"
        />
      </Link>
      <Link to={`/books/${book._id}`}>
        <h3 className="text-lg font-bold mt-2 text-[#3F51B5]">{book.title}</h3>
      </Link>
      <p className="text-sm font-['Arial']">{book.description}</p>
      <p className="text-gray-700 font-medium">By: {book.author}</p>
      <p className="text-gray-900 font-bold text-lg">${book.price}</p>
      <div className="mt-4">
        <button
          onClick={handleAddToCart}
          className="hover:bg-green-700 text-white py-2 px-4 rounded w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
