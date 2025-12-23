// src/components/Navbar.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Form from './Form';
import { IoMdAdd } from "react-icons/io";

function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    alert("🔓 Logged out");
    navigate('/login'); // Redirect after logout
  };

  return (
    <nav className="bg-gray-300 text-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">

        <div className="flex items-center">
          <img src="/newlogo.png" alt="Logo" className="h-10 mr-2" />
          <span className="font-bold text-xl">AUCTION</span>
        </div>

        <div className="flex items-center gap-6 text-xl font-bold relative">
          <Link to="/" className="hover:text-red-600 transition">Home</Link>

          {user ? (
            <>
              <Link to="/cart" className="hover:text-red-600 transition">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 21a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
              </Link>
              <div className="relative" ref={dropdownRef}>
                <img
                  src={user.photoURL || "/default-profile.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full border cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                    <div className="px-4 py-2 border-b text-sm text-gray-700">
                      {user.displayName || user.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className="hover:text-red-600 transition">Login</Link>
          )}
          <Link
            to="/form"
            className="flex items-center justify-center gap-2 w-32 py-2 px-4 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold hover:from-emerald-600 hover:to-blue-600 transition duration-300 shadow-lg"
          >
            Sell
          </Link>



        </div>
      </div>
    </nav>
  );
}

export default Navbar;
