// Marquee.js (Frontend)
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Marquee.css";
import { backendUrl } from "../../../../admin/src/App";

const Marquee = () => {
  const [text, setText] = useState("");
  // console.log("text",text);
  // console.log("backendurl",backendUrl);
 

  useEffect(() => {
    const fetchMarqueeText = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/hitech/mute/getmarquee`);
        console.log(response);
        setText(response.data.marquee.text); // Update state with the fetched text
      } catch (error) {
        console.error("There was an error fetching the marquee text!", error);
      }
    };
  
    fetchMarqueeText(); // Call the async function
  }, []);
  

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {/* marqu */}
        {Array(30) // Create the repeated spans dynamically
          .fill(text)
          .map((text, index) => (
            <span key={index}>{text}</span>
          ))}
      </div>
    </div>
  );
};

export default Marquee;
