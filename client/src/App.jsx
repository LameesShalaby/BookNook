import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BookList from "./pages/BookList/BookList";
import Cart from "./components/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import BookDetail from "./pages/BookDetail/BookDetail";
import { ToastContainer } from "react-toastify";

const App = () => (
  <Router future={{ v7_relativeSplatPath: true }}>
    <Layout>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/:bookId" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Layout>
    <ToastContainer />
  </Router>
);

export default App;
