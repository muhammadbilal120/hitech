import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentState, setCurrentState] = useState("Login");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(backendUrl + "/api/hitech/user/login", {
        email,
        password,
      });

      if (response.data.success) {
        console.log(response.data.phone)
        localStorage.setItem("phone", response.data.phone)
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        navigate("/"); // Redirect to the login page
      } else {
        toast.error(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col bg-transparent mb-36 items-center w-[90%] sm:max-w-2xl m-auto mt-14 gap-4 text-gray-800 py-12"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p
          className="prata-regular text-3xl"
          style={{ color: "#8ACFB6", fontWeight: "bolder" }}
        >
          {currentState}
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-950" />
      </div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        className="w-full sm:w-1/2 px-3 py-2 border border-gray-800"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="relative w-full sm:w-1/2">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          className="w-full px-3 py-2 border border-gray-800"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-3 text-gray-500"
        ></button>
      </div>
      <div>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <div>
        Don't have an account?{" "}
        <Link
          to="/signup"
          style={{ color: "#8ACFB6" }}
          className="underline hover:underline-offset-4"
        >
          Sign up
        </Link>
      </div>

      <button
        type="submit"
        className={`w-full sm:w-1/2 max-w-64 mb-8 px-4 py-2 rounded-md text-white bg-gray-800 hover:bg-customGreen ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
