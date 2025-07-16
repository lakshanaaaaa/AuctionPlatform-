import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
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

      {/* Section Title */}
      <div className="bg-white py-20 px-3 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Explore Live Auctions</h2>
        <p className="text-gray-600">Start bidding on your favorite items now!</p>
      </div>

      {/* Products Demo Section */}
      <div className="flex">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 w-[800px] h-[500px] mx-40 overflow-hidden rounded-lg">
          <img src="/demopic3.jpg" alt="" loading="lazy" className="col-span-2 row-span-2 object-cover w-full h-full rounded hover:scale-110 duration-500 transition-transform" />
          <img src="/demopicn.jpg" alt="" loading="lazy" className="col-span-2 row-span-1 object-cover w-full h-full rounded hover:scale-110 duration-500 transition-transform" />
          <img src="/demopic1.jpg" alt="" loading="lazy" className="col-span-1 row-span-1 object-cover w-full h-full rounded hover:scale-110 duration-500 transition-transform" />
          <img src="/demopic4.jpg" alt="" loading="lazy" className="col-span-1 row-span-1 object-cover w-full h-full rounded hover:scale-110 duration-500 transition-transform" />
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
     <div className="mt-20 bg-gray-300 w-full">
  <footer className="max-w-6xl mx-auto px-6 py-10 text-gray-800">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

      {/* Brand */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AuctionHub</h2>
        <p className="text-sm">
          Discover and bid on rare collectibles, antiques, and vintage finds.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
        <ul className="space-y-1 text-sm">
          <li><a href="/" className="hover:text-emerald-600">Home</a></li>
          <li><a href="/product" className="hover:text-emerald-600">Live Auctions</a></li>
          <li><a href="/form" className="hover:text-emerald-600">Sell Item</a></li>
          <li><a href="/login" className="hover:text-emerald-600">Login</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Contact</h3>
        <p className="text-sm">📧 support@auctionhub.com</p>
        <p className="text-sm">📞 +91 98765 43210</p>
      </div>

      {/* Socials */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
        <div className="flex gap-3 text-xl">
          <a href="#" className="hover:text-blue-600">🌐</a>
          <a href="#" className="hover:text-blue-500">📘</a>
          <a href="#" className="hover:text-pink-500">📸</a>
          <a href="#" className="hover:text-sky-400">🐦</a>
        </div>
      </div>
    </div>

    <div className="text-center text-sm text-gray-600 mt-10 border-t pt-4">
      &copy; {new Date().getFullYear()} AuctionHub. All rights reserved.
    </div>
  </footer>
</div>

    </>
  );
};

export default Home;
