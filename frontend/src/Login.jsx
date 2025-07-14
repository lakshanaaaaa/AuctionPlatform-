// src/components/Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [passwrd, setPasswrd] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email.trim(), passwrd);
      setMessage({ text: '✅ Login successful!', type: 'success' });
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMessage({ text: '❌ Login failed: ' + error.message, type: 'error' });
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setMessage({ text: '✅ Logged in with Google!', type: 'success' });
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMessage({ text: '❌ Google login failed: ' + error.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form onSubmit={handleLogin} className="bg-zinc-900 text-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm text-gray-400" htmlFor="password">Password</label>
            <a href="#" className="text-xs text-gray-400 hover:underline">Forgot password?</a>
          </div>
          <input
            type="password"
            id="password"
            value={passwrd}
            onChange={(e) => setPasswrd(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-md transition"
        >
          Login
        </button>

        {message.text && (
          <div className={`my-3 text-sm text-center px-3 py-2 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition"
        >
          Sign in with Google
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account? <Link to="/signup" className="text-white underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
