import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bg-black text-white py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mx-auto  max-w-screen-lg">
        <div className="mx-5">
          <p className="text-lg font-bold mb-4" style={{color:"#C70909"}}>INFORMATION</p>
          <ul className="space-y-2 text-gray-300">
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="mx-5">
          <p className="text-lg font-bold mb-4" style={{color:"#C70909"}}>OUR SERVICES</p>
          <ul className="space-y-2 text-gray-300">
            <li>Returns</li>
          </ul>
        </div>

        <div className="mx-5">
          <p className="text-lg font-bold mb-4" style={{color:"#C70909"}}>OUR SUPPORT</p>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to={"/contact"}>Contact</Link>{" "}
            </li>
            <li>
              <Link to={"/about"}>About Us</Link>
            </li>
          </ul>
        </div>

        <div className="mx-5">
          <p className="text-lg font-bold mb-4" style={{color:"#C70909"}}>CONTACT US</p>
          <ul className="space-y-2 text-gray-300">
            <li>Lahore, Punjab, Pakistan</li>
            <li>+92 3014669806</li>
            <li>arifahmad_15@yahoo.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8"></div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-5 text-gray-400 text-sm mx-10">
        <p>All Rights Reserved By HiTech Copyright © 2025</p>

        <div className="flex space-x-4 mt-3 sm:mt-0">
          <a
            title="Facebook"
            href="https://www.facebook.com/profile.php?id=61561197732897"
            target="_blank"
          >
            <CiFacebook size={30} />
          </a>

          <a
            title="instagram"
            href="https://www.instagram.com/mute.pk"
            target="_blank"
          >
            <FaInstagram size={26} />
          </a>

          <a
            title="tiktok"
            href="https://www.tiktok.com/@mute.pk"
            target="_blank"
          >
            <FaTiktok size={24} />
          </a>

          <a title="whatsapp" href="https://wa.link/dzn9ic" target="_blank">
            <FaWhatsapp size={26} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
