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
     <div className="mt-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black w-full">
  <footer className="max-w-6xl mx-auto px-6 py-12 text-white">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

      {/* Brand */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">AuctionHub</h2>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          Discover and bid on rare collectibles, antiques, and vintage finds from trusted sellers worldwide.
        </p>
        <div className="flex items-center space-x-2 text-emerald-400">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Trusted by 10,000+ collectors</span>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
          <svg className="w-5 h-5 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          Quick Links
        </h3>
        <ul className="space-y-3 text-sm">
          <li><a href="/" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            Home
          </a></li>
          <li><a href="/product" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            Live Auctions
          </a></li>
          <li><a href="/form" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            Sell Item
          </a></li>
          <li><a href="/login" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            Login
          </a></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
          <svg className="w-5 h-5 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Contact
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center text-gray-300 hover:text-emerald-400 transition-colors">
            <svg className="w-4 h-4 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            </svg>
            support@auctionhub.com
          </div>
          <div className="flex items-center text-gray-300 hover:text-emerald-400 transition-colors">
            <svg className="w-4 h-4 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            +91 98765 43210
          </div>
          <div className="flex items-center text-gray-300">
            <svg className="w-4 h-4 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            24/7 Support Available
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
          <svg className="w-5 h-5 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
          Categories
        </h3>
        <ul className="space-y-3 text-sm">
          <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            Antiques & Collectibles
          </a></li>
          <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            Coins & Currency
          </a></li>
          <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            Toys & Games
          </a></li>
          <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            Electronics
          </a></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-gray-700 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} AuctionHub. All rights reserved.</p>
        <div className="flex space-x-4 text-xs text-gray-500">
          <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-gray-400 text-sm">Secure payments</span>
        <div className="flex space-x-2">
          <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">V</span>
          </div>
          <div className="w-8 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">PP</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>

    </>
  );
};

export default Home;
