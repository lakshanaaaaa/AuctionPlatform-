import React from 'react';

const Home = () => {
  return (
    <>
      <div className="bg-gray-300">
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

          <div className="w-[500px]">
            <img
              src="/homepic.jpg"
              alt="Auction Visual"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="bg-white py-20 px-3 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Explore Live Auctions</h2>
        <p className="text-gray-600">Start bidding on your favorite items now!</p>
      </div>
    </>
  );
};

export default Home;
