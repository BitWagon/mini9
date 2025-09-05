"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Gamepad2 } from "lucide-react";

export default function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-[#0f0f1a] text-white shadow-lg">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-wide">
          <Gamepad2 className="text-purple-500" />
          EpicVault
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-purple-400 transition">Home</Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 hover:text-purple-400 transition"
            >
              Explore
              <ChevronDown size={16} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute mt-2 w-52 bg-[#1a1a2e] rounded-lg shadow-lg p-3 z-50"
                >
                  <Link href="/news" className="block px-4 py-2 rounded hover:bg-purple-500/20">
                    News
                  </Link>
                  <Link href="/reviews" className="block px-4 py-2 rounded hover:bg-purple-500/20">
                    Reviews
                  </Link>
                  <Link href="/tournaments" className="block px-4 py-2 rounded hover:bg-purple-500/20">
                    Tournaments
                  </Link>
                  <Link href="/community" className="block px-4 py-2 rounded hover:bg-purple-500/20">
                    Community
                  </Link>
                  <Link href="/store" className="block px-4 py-2 rounded hover:bg-purple-500/20">
                    Store
                  </Link>
                  <Link href="/profile" className="block px-4 py-2 rounded hover:bg-purple-500/20">
                    Profile
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#1a1a2e] px-6 py-4 space-y-3"
          >
            <Link href="/" className="block hover:text-purple-400">Home</Link>
            <Link href="/news" className="block hover:text-purple-400">News</Link>
            <Link href="/reviews" className="block hover:text-purple-400">Reviews</Link>
            <Link href="/tournaments" className="block hover:text-purple-400">Tournaments</Link>
            <Link href="/community" className="block hover:text-purple-400">Community</Link>
            <Link href="/store" className="block hover:text-purple-400">Store</Link>
            <Link href="/profile" className="block hover:text-purple-400">Profile</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
