"use client";
import React, { useState } from 'react';
import { Search, Camera, MessageCircle, DollarSign, MapPin, Menu, X, ArrowRight } from 'lucide-react';

const SwapSpotLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* --- NAVBAR --- */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-emerald-900">SwapSpot</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="hover:text-emerald-600 font-medium">Browse</a>
            <a href="#" className="hover:text-emerald-600 font-medium">How it Works</a>
            <a href="#" className="hover:text-emerald-600 font-medium">Login</a>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2">
              <Camera size={18} /> SELL NOW
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4">
            <a href="#" className="block py-2">Browse Items</a>
            <a href="#" className="block py-2">Login</a>
            <button className="bg-emerald-600 text-white w-full py-3 rounded-lg font-bold">
              + SELL AN ITEM
            </button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative bg-emerald-900 py-20 md:py-32">
        {/* Background Pattern Overlay (Optional) */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Turn Your Clutter Into <span className="text-emerald-400">Cash.</span>
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            The fastest way to buy and sell locally. Join thousands of people on SwapSpot today.
          </p>

          {/* Search Box */}
          <div className="bg-white p-2 rounded-lg shadow-xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2">
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-md flex-1">
              <Search className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Find cars, mobile phones, furniture..." 
                className="bg-transparent w-full outline-none text-gray-700"
              />
            </div>
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-md md:w-1/3">
              <MapPin className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="India" 
                className="bg-transparent w-full outline-none text-gray-700"
              />
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-md font-bold transition-colors">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* --- CATEGORIES --- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Mobiles', 'Cars', 'Bikes', 'Electronics', 'Furniture', 'Fashion'].map((cat, idx) => (
              <div key={idx} className="group cursor-pointer border hover:border-emerald-500 rounded-xl p-6 flex flex-col items-center justify-center transition-all hover:shadow-lg bg-white">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  {/* Using a generic icon for demo */}
                  <Search size={20} />
                </div>
                <span className="font-medium text-gray-700">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">How SwapSpot Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Post in Seconds</h3>
              <p className="text-gray-600">Take a photo, add a price and description. It takes less than 30 seconds to go live.</p>
            </div>
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Chat with Buyers</h3>
              <p className="text-gray-600">Use our secure chat to negotiate prices and set up a meeting spot.</p>
            </div>
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Sell & Earn</h3>
              <p className="text-gray-600">Meet the buyer, hand over the item, and get paid instantly. Simple as that.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FRESH RECOMMENDATIONS --- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold">Fresh Recommendations</h2>
            <a href="#" className="text-emerald-600 font-semibold flex items-center hover:underline">
              View all <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <div className="h-48 bg-gray-200 w-full flex items-center justify-center text-gray-400">
                  Item Image
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">₹ 15,000</h3>
                  <p className="text-gray-600 text-sm mb-2 truncate">iPhone 11 - Good Condition</p>
                  <div className="flex justify-between text-xs text-gray-400 mt-4">
                    <span>Meerut, UP</span>
                    <span>Today</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to make some cash?</h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
            Don&apos;t let your unused items gather dust. Post an ad on SwapSpot today.
          </p>
          <button className="bg-white text-emerald-900 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-transform hover:scale-105">
            Start Selling Now
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">SwapSpot</h3>
            <p className="text-sm">The best place to buy and sell locally. Safe, simple, and free to use.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Popular Locations</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Mumbai</a></li>
              <li><a href="#" className="hover:text-white">Delhi</a></li>
              <li><a href="#" className="hover:text-white">Bangalore</a></li>
              <li><a href="#" className="hover:text-white">Hyderabad</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">About Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-emerald-600 cursor-pointer"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-emerald-600 cursor-pointer"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-emerald-600 cursor-pointer"></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          &copy; 2024 SwapSpot. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SwapSpotLanding;