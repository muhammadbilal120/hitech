import React, { useEffect, useState } from "react";
import axios from "axios";

const Checkout = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(
          "http://localhost:5000/api/user-details",
          config
        );

        if (data.success) {
          setUserData(data.user);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <form>
      <input type="text" value={userData.name} placeholder="Name" readOnly />
      <input type="email" value={userData.email} placeholder="Email" readOnly />
      <input
        type="tel"
        value={userData.phoneNumber}
        placeholder="Phone Number"
        readOnly
      />
      <input
        type="text"
        value={userData.address}
        placeholder="Address"
        readOnly
      />
      <input type="text" value={userData.city} placeholder="City" readOnly />
      <input
        type="text"
        value={userData.country}
        placeholder="Country"
        readOnly
      />
    </form>
  );
};

export default Checkout;
