import React from 'react';
import { Link } from 'react-router-dom';
function Navbar(){
    return(
        <nav>
            <div className="text-black bg-gray-300 flex w-full h-20  justify-between items-center text-xl font-sans font-bold">
              <img src="/newlogo.png" alt="Logo" className="h-30 pt-2" />
            <div className="flex gap-x-6 flex-end pr-5">
            <Link to="/" className="text-black">Home</Link>
        <Link to="/login" className="text-black">Login</Link>
            <Link to="/"><svg
  className="w-8 h-8 text-black"
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
>
  <path
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
  />
</svg>
</Link>
            </div>
            </div>
        </nav>
    )
}

export default Navbar