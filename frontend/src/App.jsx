import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Components/Contact/Contact";
import Collections from "./Pages/Collections";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
// import Login from "./Pages/Login";
import PlaceOrder from "./Pages/PlaceOrder";
import Orders from "./Pages/Orders";
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/Scroll/ScrollToTop";
import TermAndCondition from "./Pages/TermAndCondition";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import LoginForm from "./Pages/LoginForm";
import SignupForm from "./Pages/SignupForm";
import SizeChart from "./Pages/SizeChart";

const App = () => {
  return (
    <div className="px-4 smn:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer autoClose={2000} />
      <Navbar />
      <SearchBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/loginpage" element={<LoginForm />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/termsandcondition" element={<TermAndCondition />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer />
      <Footer />
      {/* <SizeChart/> */}
    </div>
  );
};

export default App;
