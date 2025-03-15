import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const countryCityData = {
  Pakistan: ["Karachi", "Lahore", "Islamabad", "Rawalpindi"],
};

const SignupForm = () => {
  const [currentState] = useState("Sign Up");
  const { setToken, backendUrl, navigate } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Pakistan");
  const [cities, setCities] = useState(countryCityData["Pakistan"]);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10,13}$/;
    return phoneRegex.test(phone);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    if (!address.trim()) {
      toast.error("Please enter your address.");
      return;
    }

    if (!city) {
      toast.error("Please select a city.");
      return;
    }

    if (!agree) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(backendUrl + "/api/hitech/user/register", {
        name,
        email,
        password,
        confirmPassword,
        phoneNumber,
        address,
        city,
        country,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Registration successful!");
        navigate("/loginpage");
      } else {
        toast.error(
          response.data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    setCities(countryCityData[selectedCountry] || []);
    setCity("");
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

      <div className="flex flex-col sm:flex-row sm:space-x-4 w-full">
        <input
          type="text"
          placeholder="Name"
          value={name}
          className="w-full sm:w-1/2 px-3 py-2 border border-gray-800 mb-4 sm:mb-0"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full sm:w-1/2 px-3 py-2 border border-gray-800"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 w-full">
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full sm:w-1/2 px-3 py-2 border border-gray-800 mb-4 sm:mb-0"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          className="w-full sm:w-1/2 px-3 py-2 border border-gray-800"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 w-full">
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          className="w-full sm:w-1/2 px-3 py-2 border border-gray-800 mb-4 sm:mb-0"
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          className="w-full sm:w-1/2 px-3 py-2 border border-gray-800"
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 w-full">
        <select
          value={country}
          onChange={handleCountryChange}
          required
          className="w-full sm:w-1/2 px-3 py-2 border border-gray-800 mb-4 sm:mb-0"
        >
          {Object.keys(countryCityData).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="w-full sm:w-1/2 px-3 py-2 border border-gray-800"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row justify-between w-full">
        <div className="flex items-center mb-4 sm:mb-0">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            required
          />{" "}
          <span className="pl-2">
            I agree{" "}
            <Link
              to="/termsandcondition"
              style={{ color: "#8ACFB6" }}
              className="underline hover:underline-offset-4"
            >
              terms and conditions
            </Link>
          </span>
        </div>
        <div>
          Already have an account?{" "}
          <Link
            to="/loginpage"
            style={{ color: "#8ACFB6" }}
            className="underline hover:underline-offset-4"
          >
            Login
          </Link>
        </div>
      </div>

      <button
        type="submit"
        style={{
          background: !agree || loading ? "#D3D3D3" : "#8ACFB6",
          cursor: !agree || loading ? "not-allowed" : "pointer",
        }}
        disabled={!agree || loading}
        className="mt-2 py-3 text-gray font-semibold uppercase transition-all w-full max-w-64 mb-8 px-4  rounded-md text-white hover:bg-gray-800"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
