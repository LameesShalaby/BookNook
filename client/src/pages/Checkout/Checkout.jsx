import React, { useState } from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cart || []);
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    shippingAddress: "",
    billingAddress: "",
    paymentMethod: "creditCard",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckout = () => {
    if (!formData.shippingAddress || !formData.billingAddress) {
      alert("Please fill in all fields.");
      return;
    }
    alert("Thank you for your purchase!");
    console.log("Order completed with details:", formData, "Total:", total);
  };

  return (
    <>
      <h3 className="text-3xl font-bold mb-4 text-gray-800 text-center pt-12 pb-8">
        Checkout
      </h3>
      <div className="checkout p-8 bg-gray-100 rounded-md shadow-md max-w-md mx-auto mt-10">
        <div className="mb-6 text-xl font-semibold">
          <p>
            Total: <span className="text-green-500">${total.toFixed(2)}</span>
          </p>
        </div>

        <form className="checkout-form space-y-4">
          <div>
            <label className="block font-medium mb-1">Shipping Address</label>
            <input
              type="text"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Billing Address</label>
            <input
              type="text"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="text-white py-2 px-4 rounded font-semibold w-full"
          >
            Confirm Purchase
          </button>
        </form>
      </div>
    </>
  );
};

export default Checkout;
