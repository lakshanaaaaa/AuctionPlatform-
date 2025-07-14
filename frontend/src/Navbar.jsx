// src/components/Navbar.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

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
    navigate('/login');
  };

  return (
    <nav className="bg-gray-300 text-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        {/* Logo and title */}
        <div className="flex items-center">
          <img src="/newlogo.png" alt="Logo" className="h-10 mr-2" />
          <span className="font-bold text-xl">AUCTION</span>
        </div>

        {/* Navigation + Profile/Login */}
        <div className="flex items-center gap-6 text-xl font-bold relative">
          <Link to="/" className="hover:text-sky-600 transition">Home</Link>

          {user ? (
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
          ) : (
            <Link to="/login" className="hover:text-sky-600 transition">Login</Link>
          )}

          <Link to="/" className="hover:text-sky-600 transition">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 4h1.5L9 16h8a2 2 0 100 4 2 2 0 000-4H9a2 2 0 100 4 2 2 0 000-4H5l-.5-3h13.25L19 7H7.312"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
