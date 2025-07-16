import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

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

      {/* products demo */}
      <div className="flex">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 w-[800px] h-[500px] mx-40 overflow-hidden rounded-lg">
          <img src="/demopic3.jpg" alt="" className="col-span-2 row-span-2 object-cover w-full h-full rounded hover:scale-110 duration-500 transition-transform" />
          <img src="/demopicn.jpg" alt="" className="col-span-2 row-span-1 object-cover w-full h-full rounded hover:scale-110 duration-500 transition-transform" />
          <img src="/demopic1.jpg" alt="" className="col-span-1 row-span-1 object-cover w-full h-full rounded hover:scale-110 duration-500 transition-transform" />
          <img src="/demopic4.jpg" alt="" className="col-span-1 row-span-1 object-cover w-full h-full rounded hover:scale-110 duration-500 transition-transform" />
        </div>

        <div className="flex items-center hover:scale-110 duration-500 transition-transform ml-6">
          <Link
            to="/product"
            className="rounded-full h-15 w-70 bg-black flex items-center justify-between px-6 py-3 text-white"
          >
            <span className="text-xl font-bold">Enter Auction</span>
            <FaArrowRight className="text-2xl" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
