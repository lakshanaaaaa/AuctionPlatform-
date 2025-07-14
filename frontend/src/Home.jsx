import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">

        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-16">

          <div className="max-w-xl">
            <h1 className="text-4xl font-semibold text-gray-900 leading-snug mb-4">
              Going once, going twice...<br />
              <span className="text-gray-700">Grab your next win before it’s gone</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Discover rare finds, bid in real-time, and win what matters most.
            </p>
          </div>

          {/* Image */}
          <div className="w-[500px]">
            <img
              src="/homepic.jpg"
              alt="Auction Visual"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
