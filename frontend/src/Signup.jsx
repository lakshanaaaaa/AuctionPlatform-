import React from 'react';

const Signup = () => {
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
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-md transition"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup