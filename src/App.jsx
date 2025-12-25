import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";

import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Orders from "./pages/Orders.jsx";
import Integrations from "./pages/Integrations.jsx";
import ImportHistory from "./pages/ImportHistory.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Cookies from "./pages/Cookies.jsx";
import Compare from "./pages/Compare.jsx";
import Collections from "./pages/Collections.jsx";
import ImageLightbox from "./components/ImageLightbox.jsx";
import QuickView from "./components/QuickView.jsx";
import CompareListener from "./components/CompareListener.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Toast />
      <QuickView />
      <ImageLightbox />
      <CompareListener />
      <div className="container-fluid py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/import-history" element={<ImportHistory />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/collections" element={<Collections />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
