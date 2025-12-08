import {
  Camera,
  DollarSign,
  IndianRupee,
  MessageCircle,
  PackageSearch,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <div className="hero relative w-full flex flex-col items-center justify-center h-[calc(100vh-76px)] bg-emerald-900 text-white overflow-hidden">
        {/* BACKGROUND PATTERN START */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        {/* BACKGROUND PATTERN END */}

        {/* Content ke liye 'relative' aur 'z-10' zaroori hai taaki wo pattern ke upar dikhe */}
        <div className="text p-6 text-center flex flex-col gap-2 items-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold md:font-black">
            Turn Your Clutter Into{" "}
            <span className="text-emerald-500">Cash</span>{" "}
          </h1>
          <p className="my-2 text-emerald-100">
            SwapSpot is a platform where you can buy and sell used products at
            the best price.
          </p>

          <p className="flex gap-4 flex-col md:flex-row mt-4">
            <Link
              href="/product/create"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
            >
              <Camera size={18} /> SELL NOW
            </Link>

            <Link
              href="/product"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
            >
              <PackageSearch size={18} /> BUY NOW
            </Link>
          </p>
        </div>
      </div>

      {/* How it works section */}
      <section id="howItWorks" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">How SwapSpot Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Post in Seconds</h3>
              <p className="text-gray-600">
                Take a photo, add a price and description. It takes less than 30
                seconds to go live.
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Contact with Buyers</h3>
              <p className="text-gray-600">
                Once the item is live, you can start receiving offers from
                interested buyers.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                {/* <DollarSign size={32} /> */}
                <IndianRupee size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Sell & Earn</h3>
              <p className="text-gray-600">
                Meet the buyer, hand over the item, and get paid instantly.
                Simple as that.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">SwapSpot</h3>
            <p className="text-sm">
              The best place to buy and sell locally. Safe, simple, and free to
              use.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Popular Locations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Mumbai
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Delhi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Bangalore
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Hyderabad
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">About Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
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
          &copy; 2025 SwapSpot. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Hero;
