import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeItem, updateItemQuantity } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cart);

  // Calculate total price
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
    toast.success("Book removed from cart!");
  };

  const handleQuantityChange = (itemId, delta) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item.quantity + delta > 0) {
      dispatch(updateItemQuantity({ id: itemId, delta }));
    }
  };

  return (
    <>
      <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center pt-12">
        Cart
      </h3>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">Your cart is empty</p>
            <Link
              to="/"
              className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded"
            >
              Back to Shop
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-4"
              >
                {/* Item Details */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.coverImage || "https://via.placeholder.com/150"}
                    alt={item.title}
                    className="h-24 w-24 rounded-full border object-cover"
                  />
                  <div>
                    <Link
                      to={`/books/${item._id}`}
                      className="text-lg font-semibold text-gray-800 hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p className="text-gray-500 mt-1">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      onClick={() => handleQuantityChange(item._id, -1)}
                      aria-label="Decrease Quantity"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      onClick={() => handleQuantityChange(item._id, 1)}
                      aria-label="Increase Quantity"
                    >
                      +
                    </button>
                  </div>
                  <span
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleRemove(item._id)}
                    aria-label="Remove Item"
                  >
                    <FaTrash size={18} />
                  </span>
                </div>
              </div>
            ))}

            {/* Total and Checkout */}
            <div className="border-t pt-6">
              <h4 className="text-xl font-semibold text-gray-800">
                Total:{" "}
                <span className="text-gray-600">${total.toFixed(2)}</span>
              </h4>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
