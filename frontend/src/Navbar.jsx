import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-100 text-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
    
        <div className="flex items-center">
          <img src="/newlogo.png" alt="Logo" className="h-10 " />
          <span className="font-bold text-xl">AUCTION</span>
        </div>

        <div className="flex items-center gap-6 text-xl font-bold">
          <Link to="/" className="hover:text-sky-600 transition">Home</Link>
          <Link to="/login" className="hover:text-sky-600 transition">Login</Link>
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
