import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [passwrd, setPasswrd] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const navigate = useNavigate();

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), passwrd);
      showMessage('✅ Account created!', 'success');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      showMessage('❌ Signup failed: ' + error.message, 'error');
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      showMessage('✅ Signed up with Google!', 'success');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      showMessage('❌ Google signup failed: ' + error.message, 'error');
    }
  };

  const Message = ({ type, text }) => {
    const color = type === 'success' ? 'bg-green-600' : 'bg-red-600';
    return (
      <div className={`mb-4 text-white px-4 py-2 rounded-md ${color}`}>
        {text}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form
        onSubmit={handleSignup}
        className="bg-zinc-900 text-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        {message.text && <Message text={message.text} type={message.type} />}
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
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-md transition mb-3"
        >
          Sign up
        </button>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full bg-white hover:bg-blue-400 text-black font-bold py-2 rounded-md transition flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285F4" d="M533.5 278.4c0-17.4...z" />
            <path fill="#34A853" d="M272 544.3c71.6 0...z" />
            <path fill="#FBBC05" d="M123.8 329.2c-10.3-30...z" />
            <path fill="#EA4335" d="M272 107.7c37.3 0...z" />
          </svg>
          Sign up with Google
        </button>
      </form>
    </div>
  );
};

export default Signup;
