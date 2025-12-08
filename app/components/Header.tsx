"use client";

import { Camera, CircleUserRound, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white p-4  shadow-sm sticky top-0 z-50">
        <div className="container  mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-emerald-900">
              SwapSpot
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/product" className="hover:text-emerald-600 font-medium">
              Browse
            </Link>
            <a href="#howItWorks" className="hover:text-emerald-600 font-medium">
              How it Works
            </a>
            {session ? (
              <Link
                href="/profile"
                className="hover:text-emerald-600 font-medium"
              >
                <CircleUserRound />
              </Link>
            ) : (
              <Link
                href="/login"
                className="hover:text-emerald-600 font-medium"
              >
                Login
              </Link>
            )}
            <Link href="/product/create">
              <button
                type="button"
                className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white px-6 py-2.5 rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
              >
                <Camera size={18} /> SELL NOW
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4">
            <Link href="/product" className="block py-2">
              Browse Items
            </Link>
            {session ? (
              <Link
                href="/profile"
                className="hover:text-emerald-600 font-medium flex items-center gap-2"
              >
                <p>
                  <CircleUserRound />
                </p>
                <p>{session.user.username}</p>
              </Link>
            ) : (
              <Link
                href="/login"
                className="hover:text-emerald-600 font-medium"
              >
                Login
              </Link>
            )}
            <Link href="/product/create" className="block py-2">
              <button
                type="button"
                className="bg-emerald-600 text-white w-full py-3 rounded-lg font-bold"
              >
                + SELL AN ITEM
              </button>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
