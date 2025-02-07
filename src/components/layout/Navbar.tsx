import React, { useState, useEffect } from "react";
import { Icon } from "../ui/Icons";

type UserData = {
  name: string;
  id: string;
  email: string;
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cart state (to be implemented with actual cart functionality)
  const itemCount = 0;
  const cartTotal = 0;

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem("authToken");
        const userStr = localStorage.getItem("user");
        if (token && userStr) {
          const user = JSON.parse(userStr);
          setIsLoggedIn(true);
          setUserData(user);
        } else {
          setIsLoggedIn(false);
          setUserData(null);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkAuthStatus();
    window.addEventListener("auth-change", checkAuthStatus);
    return () => {
      window.removeEventListener("auth-change", checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserData(null);
    window.location.href = "/";
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button and Brand Logo */}
          <div className="flex items-center flex-1 sm:flex-none">
            <button
              onClick={toggleMenu}
              className="sm:hidden p-2 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <Icon name="x" className="h-6 w-6 text-gray-600" />
              ) : (
                <Icon name="menu" className="h-6 w-6 text-gray-600" />
              )}
            </button>
            <a
              href="/"
              className="dm-sans-semi-bold font-bold text-pink-400 ml-2 sm:ml-0 flex-1 text-center sm:text-left"
            >
              <span className="pacifico-bold text-2xl sm:text-3xl pr-2">Crochet</span>
              <span className="hidden sm:inline-block">by Ameesha</span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex items-center space-x-8">
            <a
              href="/shop"
              className="text-gray-600 hover:text-pink-400 transition-colors"
            >
              Shop
            </a>
            <a
              href="/#about"
              className="text-gray-600 hover:text-pink-400 transition-colors"
            >
              About
            </a>
            <a
              href="/#contact"
              className="text-gray-600 hover:text-pink-400 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* User, Cart, and Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isLoggedIn && userData ? (
              <>
                <a
                  href={`/profile/${userData.id}`}
                  className="hidden sm:flex items-center text-gray-600 hover:text-pink-400 transition-colors"
                >
                  <Icon name="user" className="h-5 w-5 mr-1" />
                  <span>{userData.name}</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="hidden sm:block bg-pink-400 text-white px-4 py-2 rounded-full hover:bg-pink-500 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="hidden sm:flex items-center space-x-4">
                <a
                  href="/login"
                  className="text-gray-600 hover:text-pink-400 transition-colors"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-pink-primary pacifico-regular text-white px-4 py-2 rounded-full hover:bg-pink-secondary transition-colors"
                >
                  Register
                </a>
              </div>
            )}

            {/* Cart Section */}
            <div className="flex items-center">
              {cartTotal > 0 && (
                <span className="hidden sm:block text-gray-600 mr-2">
                  ₹{cartTotal.toFixed(2)}
                </span>
              )}
              <a href="/cart" className="relative p-2">
                <Icon
                  name="shoppingCart"
                  className="h-6 w-6 text-gray-600 hover:text-pink-400 transition-colors"
                />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {itemCount}
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <a
                href="/shop"
                onClick={toggleMenu}
                className="block py-2 text-gray-600 hover:text-pink-400 transition-colors"
              >
                Shop
              </a>
              <a
                href="/#about"
                onClick={toggleMenu}
                className="block py-2 text-gray-600 hover:text-pink-400 transition-colors"
              >
                About
              </a>
              <a
                href="/#contact"
                onClick={toggleMenu}
                className="block py-2 text-gray-600 hover:text-pink-400 transition-colors"
              >
                Contact
              </a>
              
              <div className="border-t pt-4 mt-2">
                {isLoggedIn && userData ? (
                  <>
                    <a
                      href={`/profile/${userData.id}`}
                      className="block py-2 text-gray-600 hover:text-pink-400 transition-colors"
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 text-gray-600 hover:text-pink-400 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="block py-2 text-gray-600 hover:text-pink-400 transition-colors"
                    >
                      Login
                    </a>
                    <a
                      href="/register"
                      className="block w-full bg-pink-primary pacifico-regular text-white px-4 py-3 rounded-full hover:bg-pink-secondary transition-colors mt-2"
                    >
                      Register
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;