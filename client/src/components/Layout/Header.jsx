import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.cart);

  return (
    <header className="bg-green-600 text-white p-4">
      <div className="container grid grid-cols-2 gap-4 mx-auto">
        <div className="col">
          <Link to="/" className="text-xl font-bold">
            BookNook
          </Link>
        </div>
        <div className="flex justify-end items-center">
          <Link to="/cart" className="relative">
            <div className="cart-icon flex items-center text-3xl">
              <FaCartShopping />
              <span className="bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs absolute -top-2 -right-2">
                {cartItems?.length || 0}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
