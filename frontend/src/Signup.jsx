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
      <form
        onSubmit={handleSignup}
        className="bg-zinc-900 text-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm text-gray-400 mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={passwrd}
            onChange={(e) => setPasswrd(e.target.value)}
            required
            className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-md transition"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
