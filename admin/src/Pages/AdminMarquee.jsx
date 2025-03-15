// AdminMarquee.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const AdminMarquee = (token) => {
  const [text, setText] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/hitech/mute/getmarquee`)
      .then((response) => {
        if (response.data.success) {
          setText(response.data.marquee.text);
        } else {
          toast.error("Failed to fetch marquee text");
        }
      })
      .catch((error) => console.error("Error fetching marquee text:", error));
  }, []);
  

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/hitech/mute/updatemarquee`,
        { text },
        {
          headers: { Authorization: token },
        }
      );
  
      if (response.data.success) {
        toast.success("Marquee text updated successfully");
      } else {
        toast.error(response.data.message || "Failed to update marquee text");
      }
    } catch (error) {
      console.error("Error updating marquee text:", error);
      toast.error("Something went wrong while updating the marquee text");
    }
  };
  

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-xl max-w-md mx-auto mt-10">
  <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
    Admin Marquee Control
  </h2>
  <textarea
    value={text}
    onChange={handleTextChange}
    rows="4"
    cols="50"
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#629482] resize-none"
    placeholder="Enter marquee text here..."
  />
  <button
    onClick={handleSave}
    className="w-full mt-4 bg-[#8ACFB6] text-white py-2 rounded-lg font-semibold hover:bg-[#629482] hover:text-gray-800 transition duration-300"
  >
    Save
  </button>
</div>


  );
};

export default AdminMarquee;
