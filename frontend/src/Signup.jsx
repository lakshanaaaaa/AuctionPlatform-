import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; 
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [passwrd, setPasswrd] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), passwrd);
      alert("✅ Account created!");
      navigate('/'); // ✅ redirect to home after signup
    } catch (error) {
      alert("❌ Signup failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form className="bg-zinc-900 text-white p-8 rounded-xl shadow-md w-full max-w-sm">
        
        <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm text-gray-400" htmlFor="password">Password</label>
          </div>
          <input
            type="password"
            id="password"
            className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-md transition mb-3"
        >
          Sign up
        </button>

        {/* Google Signup */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full bg-white hover:bg-blue-400 text-black font-bold py-2 rounded-md transition flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#4285F4"
              d="M533.5 278.4c0-17.4-1.4-34.1-4-50.4H272v95.4h146.6c-6.3 33.9-25 62.6-53.2 81.8v67h85.8c50.2-46.2 79.3-114.2 79.3-193.8z"
            />
            <path
              fill="#34A853"
              d="M272 544.3c71.6 0 131.6-23.7 175.5-64.4l-85.8-67c-23.8 16-54.4 25.4-89.7 25.4-68.9 0-127.3-46.5-148.2-109.1H35.9v68.6C80.1 486.5 170.6 544.3 272 544.3z"
            />
            <path
              fill="#FBBC05"
              d="M123.8 329.2c-10.3-30.4-10.3-62.9 0-93.3V167.3H35.9c-28.7 56.7-28.7 123.1 0 179.8l87.9-67.9z"
            />
            <path
              fill="#EA4335"
              d="M272 107.7c37.3 0 70.9 12.8 97.3 38.1l73.1-73.1C403.6 27.6 344.2 0 272 0 170.6 0 80.1 57.8 35.9 167.3l87.9 68.6c20.9-62.6 79.3-109.1 148.2-109.1z"
            />
          </svg>
          Sign up with Google
        </button>
      </form>
    </div>
  );
};

export default Signup