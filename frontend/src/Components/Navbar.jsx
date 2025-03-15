import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Marquee from "./Marquee/Marquee";
// import { useState } from "react";
import { FaAngleRight, FaPlus } from "react-icons/fa"; // React icons for arrows


const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        navigate("/loginpage");
        localStorage.removeItem("token");
        localStorage.removeItem("phone");
        setToken("");
        setCartItems({});
    };

    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    useEffect(() => {
        const openBtn = document.querySelector(".canvas_open a");
        const closeBtn = document.querySelector(".canvas_close a");
        const menuWrapper = document.querySelector(".offcanvas_menu_wrapper");

        if (openBtn && closeBtn && menuWrapper) {
            openBtn.addEventListener("click", () => {
                menuWrapper.classList.add("active");
            });

            closeBtn.addEventListener("click", () => {
                menuWrapper.classList.remove("active");
            });
        }

        return () => {
            // Cleanup event listeners
            if (openBtn) openBtn.removeEventListener("click", () => {});
            if (closeBtn) closeBtn.removeEventListener("click", () => {});
        };
    }, []);


    return (
        <>
            <Marquee />
            {/* <div className="flex justify-center py-2 sm:py-4">
        <Link to={"/"}>
          <img src={assets.mutetext} className="w-16 sm:w-18 md:w-18 lg:w-24" alt="Mute Text" />
        </Link>
      </div> */}
            {/* <div className="flex items-center justify-between px-4 sm:px-6 py-2 sm:py-4 font-medium  md:mb-4 lg:mb-4">
        <Link to={"/"}>
          <img src={assets.Mlogo} className="w-10 sm:block sm:w-18 md:w-18 lg:w-20" alt="Logo" />
        </Link>
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/collection" className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>
        <div className="flex items-center gap-4 sm:gap-6">
          <img onClick={() => setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="Search Icon" />
          <div className="group relative">
            <Link to={token ? "#" : "/loginpage"}>
              <img src={assets.profile_icon} className="w-5 cursor-pointer" alt="Profile Icon" />
            </Link>
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0">
                <div className="flex flex-col gap-2 w-32 py-3 px-14 text-gray-500 rounded">
                  <p onClick={() => { navigate("/orders"); }} className="cursor-pointer hover:text-black"> Orders </p>
                  <p onClick={logout} className="cursor-pointer hover:text-black"> Logout </p>
                </div>
              </div>
            )}
          </div>
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart Icon" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>
          <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="Menu Icon" />
        </div>
      </div>
      <div className={`fixed inset-0 overflow-hidden z-50 bg-white transition-transform duration-300 ${visible ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col text-gray-600 h-full">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
            <img className="h-4 mt-1 rotate-180" src={assets.dropdown_icon} alt="Dropdown Icon" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/"> HOME </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection"> COLLECTION </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about"> ABOUT </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact"> CONTACT </NavLink>
        </div>
      </div> */}
            <div class="off_canvars_overlay">
            </div>
            <div className="offcanvas_menu">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="canvas_open">
                            <a href="#"><i className="ion-navicon"></i></a>
                        </div>
                        <div className="offcanvas_menu_wrapper">
                            <div className="canvas_close">
                                <a href="#"><i className="ion-android-close"></i></a>
                            </div>
                            <div className="header_top_links">
                                <ul>
                                    <li><a href="/login">Register</a></li>
                                    <li><a href="/login">Login</a></li>
                                    <li><a href="/cart">Shopping Cart</a></li>
                                    <li><a href="/checkout">Checkout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            {/* <!--offcanvas menu area end--> */}

            <header>
                <div class="main_header">
                    {/* <!--header top start--> */}
                    <div className="header_top  text-white">
                        <div className="container">
                            <div className="row flex items-center justify-between">
                                {/* Logo Left Side */}
                                <div className="col-lg-4 col-md-5">
                                    <div className="header_account">
                                        <img src={assets.logo2} style={{width:"200px"}} className="w-10 sm:w-18 md:w-18 lg:w-20" alt="Logo" />
                                    </div>
                                </div>

                                {/* Icons Right Side */}
                                <div className="col-lg-8 col-md-7 p-2">
                                    <div className="header_top_links flex items-center gap-4 sm:gap-6 justify-end">
                                        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer text-white filter invert" alt="Search Icon" />

                                        <div className="group relative">
                                            <Link to={token ? "#" : "/loginpage"}>
                                                <img src={assets.profile_icon} className="w-5 cursor-pointer filter invert" alt="Profile Icon" />
                                            </Link>
                                            {token && (
                                                <div className="group-hover:block hidden absolute dropdown-menu right-0 bg-white text-black shadow-lg rounded-md">
                                                    <div className="flex flex-col gap-2 w-32 py-3 px-4 text-gray-700">
                                                        <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p>
                                                        <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <Link to="/cart" className="relative">
                                            <img src={assets.cart_icon} className="w-5 min-w-5 filter invert" alt="Cart Icon" />
                                            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-white text-black aspect-square rounded-full text-[8px]">
                                                {getCartCount()}
                                            </p>
                                        </Link>

                                        <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden filter invert" alt="Menu Icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!--header top start--> */}

                    {/* <!--header middel start--> */}
                    {/* <div class="header_middle">
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-lg-2 col-md-4 col-sm-4 col-4">
                                    <div class="logo">
                                        <a href="index.html"><img src="assets/img/logo/logo.png" alt="" /></a>
                                    </div>
                                </div>
                                <div class="col-lg-10 col-md-6 col-sm-6 col-6">
                                    <div class="header_right_box">
                                        <div class="search_container">
                                            <form action="#">
                                                <div class="hover_category">
                                                    <select class="select_option" name="select" id="categori2">
                                                        <option selected value="1">All Categories</option>
                                                        <option value="2">Accessories</option>
                                                        <option value="3">Accessories & More</option>
                                                        <option value="4">Butters & Eggs</option>
                                                        <option value="5">Camera & Video </option>
                                                        <option value="6">Mornitors</option>
                                                        <option value="7">Tablets</option>
                                                        <option value="8">Laptops</option>
                                                        <option value="9">Handbags</option>
                                                        <option value="10">Headphone & Speaker</option>
                                                        <option value="11">Herbs & botanicals</option>
                                                        <option value="12">Vegetables</option>
                                                        <option value="13">Shop</option>
                                                        <option value="14">Laptops & Desktops</option>
                                                        <option value="15">Watchs</option>
                                                        <option value="16">Electronic</option>
                                                    </select>
                                                </div>
                                                <div class="search_box">
                                                    <input placeholder="Search product..." type="text" />
                                                    <button type="submit">Search</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="header_configure_area">
                                            <div class="header_wishlist">
                                                <a href="wishlist.html"><i class="icon-heart"></i>
                                                    <span class="wishlist_count">3</span>
                                                </a>
                                            </div>
                                            <div class="mini_cart_wrapper">
                                                <a href="javascript:void(0)">
                                                    <i class="icon-shopping-bag2"></i>
                                                    <span class="cart_price">$152.00 <i class="ion-ios-arrow-down"></i></span>
                                                    <span class="cart_count">2</span>
                                                </a>
                                                <div class="mini_cart">
                                                    <div class="mini_cart_inner">
                                                        <div class="cart_close">
                                                            <div class="cart_text">
                                                                <h3>cart</h3>
                                                            </div>
                                                            <div class="mini_cart_close">
                                                                <a href="javascript:void(0)"><i class="icon-x"></i></a>
                                                            </div>
                                                        </div>
                                                        <div class="cart_item">
                                                            <div class="cart_img">
                                                                <a href="#"><img src="assets/img/s-product/product.jpg" alt="" /></a>
                                                            </div>
                                                            <div class="cart_info">
                                                                <a href="#">Fusce Aliquam</a>
                                                                <p>Qty: 1 X <span> $60.00 </span></p>
                                                            </div>
                                                            <div class="cart_remove">
                                                                <a href="#"><i class="ion-android-close"></i></a>
                                                            </div>
                                                        </div>
                                                        <div class="cart_item">
                                                            <div class="cart_img">
                                                                <a href="#"><img src="assets/img/s-product/product2.jpg" alt="" /></a>
                                                            </div>
                                                            <div class="cart_info">
                                                                <a href="#">Ras Neque Metus</a>
                                                                <p>Qty: 1 X <span> $60.00 </span></p>
                                                            </div>
                                                            <div class="cart_remove">
                                                                <a href="#"><i class="ion-android-close"></i></a>
                                                            </div>
                                                        </div>

                                                        <div class="mini_cart_table">
                                                            <div class="cart_total">
                                                                <span>Sub total:</span>
                                                                <span class="price">$138.00</span>
                                                            </div>
                                                            <div class="cart_total mt-10">
                                                                <span>total:</span>
                                                                <span class="price">$138.00</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mini_cart_footer">
                                                        <div class="cart_button">
                                                            <a href="cart.html">View cart</a>
                                                        </div>
                                                        <div class="cart_button">
                                                            <a class="active" href="checkout.html">Checkout</a>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <!--header middel end--> */}

                    {/* <!--header bottom satrt--> */}

                    <div class="header_bottom sticky-header">
                        <div class="container">
                            <div class="row align-items-center">
                                {/* <div class=" col-lg-3">
                                    <div class="categories_menu">
                                        <div class="categories_title" onClick={() => setMenuOpen(!menuOpen)}>
                                            <h2 class="categori_toggle">ALL CATEGORIES</h2>
                                        </div>
                                        <div class="categories_menu_toggle" className={`categories_menu_toggle ${menuOpen ? "active" : ""}`}>
                                            <ul>
                                                <li class="menu_item_children"><a href="#">Brake Parts <i class="fa fa-angle-right"></i></a>
                                                    <ul class="categories_mega_menu">
                                                        <li class="menu_item_children"><a href="#">Dresses</a>
                                                            <ul class="categorie_sub_menu">
                                                                <li><a href="#">Sweater</a></li>
                                                                <li><a href="#">Evening</a></li>
                                                                <li><a href="#">Day</a></li>
                                                                <li><a href="#">Sports</a></li>
                                                            </ul>
                                                        </li>
                                                        <li class="menu_item_children"><a href="#">Handbags</a>
                                                            <ul class="categorie_sub_menu">
                                                                <li><a href="#">Shoulder</a></li>
                                                                <li><a href="#">Satchels</a></li>
                                                                <li><a href="#">kids</a></li>
                                                                <li><a href="#">coats</a></li>
                                                            </ul>
                                                        </li>
                                                        <li class="menu_item_children"><a href="#">shoes</a>
                                                            <ul class="categorie_sub_menu">
                                                                <li><a href="#">Ankle Boots</a></li>
                                                                <li><a href="#">Clog sandals </a></li>
                                                                <li><a href="#">run</a></li>
                                                                <li><a href="#">Books</a></li>
                                                            </ul>
                                                        </li>
                                                        <li class="menu_item_children"><a href="#">Clothing</a>
                                                            <ul class="categorie_sub_menu">
                                                                <li><a href="#">Coats  Jackets </a></li>
                                                                <li><a href="#">Raincoats</a></li>
                                                                <li><a href="#">Jackets</a></li>
                                                                <li><a href="#">T-shirts</a></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="menu_item_children"><a href="#"> Wheels & Tires  <i class="fa fa-angle-right"></i></a>
                                                    <ul class="categories_mega_menu column_3">
                                                        <li class="menu_item_children"><a href="#">Chair</a>
                                                            <ul class="categorie_sub_menu">
                                                                <li><a href="#">Dining room</a></li>
                                                                <li><a href="#">bedroom</a></li>
                                                                <li><a href="#"> Home & Office</a></li>
                                                                <li><a href="#">living room</a></li>
                                                            </ul>
                                                        </li>
                                                        <li class="menu_item_children"><a href="#">Lighting</a>
                                                            <ul class="categorie_sub_menu">
                                                                <li><a href="#">Ceiling Lighting</a></li>
                                                                <li><a href="#">Wall Lighting</a></li>
                                                                <li><a href="#">Outdoor Lighting</a></li>
                                                                <li><a href="#">Smart Lighting</a></li>
                                                            </ul>
                                                        </li>
                                                        <li class="menu_item_children"><a href="#">Sofa</a>
                                                            <ul class="categorie_sub_menu">
                                                                <li><a href="#">Fabric Sofas</a></li>
                                                                <li><a href="#">Leather Sofas</a></li>
                                                                <li><a href="#">Corner Sofas</a></li>
                                                                <li><a href="#">Sofa Beds</a></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="menu_item_children"><a href="#"> Furnitured & Decor <i class="fa fa-angle-right"></i></a>
                                                    <ul class="categories_mega_menu column_2">
                                                        <li class="menu_item_children"><a href="#">Brake Tools</a>
                                                            <ul class="categorie_sub_menu">
                                                                <li><a href="#">Driveshafts</a></li>
                                                                <li><a href="#">Spools</a></li>
                                                                <li><a href="#">Diesel </a></li>
                                                                <li><a href="#">Gasoline</a></li>
                                                            </ul>
                                                        </li>
                                                        <li class="menu_item_children"><a href="#">Emergency Brake</a>
                                                            <ul class="categorie_sub_menu">
                                                                <li><a href="#">Dolls for Girls</a></li>
                                                                <li><a href="#">Girls' Learning Toys</a></li>
                                                                <li><a href="#">Arts and Crafts for Girls</a></li>
                                                                <li><a href="#">Video Games for Girls</a></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="menu_item_children"><a href="#"> Turbo System <i class="fa fa-angle-right"></i></a>
                                                    <ul class="categories_mega_menu column_2">
                                                        <li class="menu_item_children"><a href="#">Check Trousers</a>
                                                            <ul class="categorie_sub_menu">
                                                                <li><a href="#">Building</a></li>
                                                                <li><a href="#">Electronics</a></li>
                                                                <li><a href="#">action figures </a></li>
                                                                <li><a href="#">specialty & boutique toy</a></li>
                                                            </ul>
                                                        </li>
                                                        <li class="menu_item_children"><a href="#">Calculators</a>
                                                            <ul class="categorie_sub_menu">
                                                                <li><a href="#">Dolls for Girls</a></li>
                                                                <li><a href="#">Girls' Learning Toys</a></li>
                                                                <li><a href="#">Arts and Crafts for Girls</a></li>
                                                                <li><a href="#">Video Games for Girls</a></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li><a href="#"> Lighting</a></li>
                                                <li><a href="#"> Accessories</a></li>
                                                <li><a href="#">Body Parts</a></li>
                                                <li><a href="#">Networking</a></li>
                                                <li><a href="#">Perfomance Filters</a></li>
                                                <li><a href="#"> Engine Parts</a></li>
                                                <li class="hidden"><a href="shop-left-sidebar.html">New Sofas</a></li>
                                                <li class="hidden"><a href="shop-left-sidebar.html">Sleight Sofas</a></li>
                                                <li><a href="#" id="more-btn"><i class="fa fa-plus" aria-hidden="true"></i> More Categories</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> */}
                                <div class="col-lg-8">
                                    <div class="main_menu menu_position text-left">
                                        <nav>
                                            <ul>
                                                <li><Link class="active" to={"/"}>home</Link>
                                                    {/* <ul class="sub_menu">
                                                            <li><a href="index.html">Home shop 1</a></li>
                                                            <li><a href="index-2.html">Home shop 2</a></li>
                                                            <li><a href="index-3.html">Home shop 3</a></li>
                                                            <li><a href="index-4.html">Home shop 4</a></li>
                                                        </ul> */}
                                                </li>
                                                {/* <li class="mega_items"><a href="shop.html">shop<i class="fa fa-angle-down"></i></a> 
                                                        <div class="mega_menu">
                                                            <ul class="mega_menu_inner">
                                                                <li><a href="#">Shop Layouts</a>
                                                                    <ul>
                                                                        <li><a href="shop-fullwidth.html">Full Width</a></li>
                                                                        <li><a href="shop-fullwidth-list.html">Full Width list</a></li>
                                                                        <li><a href="shop-right-sidebar.html">Right Sidebar </a></li>
                                                                        <li><a href="shop-right-sidebar-list.html"> Right Sidebar list</a></li>
                                                                        <li><a href="shop-list.html">List View</a></li>
                                                                    </ul>
                                                                </li>
                                                                <li><a href="#">other Pages</a>
                                                                    <ul>
                                                                        <li><a href="cart.html">cart</a></li>
                                                                        <li><a href="wishlist.html">Wishlist</a></li>
                                                                        <li><a href="checkout.html">Checkout</a></li>
                                                                        <li><a href="my-account.html">my account</a></li>
                                                                        <li><a href="404.html">Error 404</a></li>
                                                                    </ul>
                                                                </li>
                                                                <li><a href="#">Product Types</a>
                                                                    <ul>
                                                                        <li><a href="product-details.html">product details</a></li>
                                                                        <li><a href="product-sidebar.html">product sidebar</a></li>
                                                                        <li><a href="product-grouped.html">product grouped</a></li>
                                                                        <li><a href="variable-product.html">product variable</a></li>
                                                                        <li><a href="product-countdown.html">product countdown</a></li>
            
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li> */}
                                                {/* <li><a href="blog.html">blog<i class="fa fa-angle-down"></i></a>
                                                        <ul class="sub_menu pages">
                                                            <li><a href="blog-details.html">blog details</a></li>
                                                            <li><a href="blog-fullwidth.html">blog fullwidth</a></li>
                                                            <li><a href="blog-sidebar.html">blog sidebar</a></li>
                                                            <li><a href="blog-no-sidebar.html">blog no sidebar</a></li>
                                                        </ul>
                                                    </li> */}
                                                {/* <li><a href="#">pages <i class="fa fa-angle-down"></i></a>
                                                        <ul class="sub_menu pages">
                                                            <li><a href="about.html">About Us</a></li>
                                                            <li><a href="faq.html">Frequently Questions</a></li>
                                                            <li><a href="contact.html">contact</a></li>
                                                            <li><a href="login.html">login</a></li>
                                                            <li><a href="404.html">Error 404</a></li>
                                                            <li><a href="compare.html">compare</a></li>
                                                            <li><a href="privacy-policy.html">privacy policy</a></li>
                                                            <li><a href="coming-soon.html">coming soon</a></li>
                                                        </ul>
                                                    </li> */}

                                                <li><Link to="/about">About Us</Link></li>
                                                <li><Link to="/contact"> Contact Us</Link></li>
                                                <li><Link to="/collection"> All Collections</Link></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="call_support text-right">
                                        <p><i class="icon-phone-call" aria-hidden="true"></i> <span>Call us:  <a href="tel:03244502117">03014669806</a></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--header bottom end--> */}
                </div>
            </header>
            {/* <!--header area end--> */}

            {/* <!--top tags area start--> */}
            {/* <div class="top_tags_area">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="tags_content">
                                    <ul>
                                        <li><span>Top Tags:</span></li>
                                        <li><a href="#">Wheels & Tires</a></li>
                                        <li><a href="#">Lighting & lamp</a></li>
                                        <li><a href="#">Body Parts</a></li>
                                        <li><a href="#">Smart Devices</a></li>
                                        <li><a href="#">Devices</a></li>
                                        <li><a href="#">Repair Parts</a></li>
                                        <li><a href="#">Car Engine</a></li>
                                        <li><a href="#">Accessories</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
        </>
    );
};

export default Navbar;
