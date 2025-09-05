"use client";
import Link from "next/link";
import { Gamepad2, Facebook, Twitter, Instagram, Youtube, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f1a] text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold mb-4">
            <Gamepad2 className="text-purple-500" />
            EpicVault
          </div>
          <p className="text-sm text-gray-400">
            Your ultimate hub for gaming news, esports, tournaments, reviews, and community. 
            Level up your journey with EpicVault.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-purple-400">Home</Link></li>
            <li><Link href="/news" className="hover:text-purple-400">News</Link></li>
            <li><Link href="/reviews" className="hover:text-purple-400">Reviews</Link></li>
            <li><Link href="/tournaments" className="hover:text-purple-400">Tournaments</Link></li>
            <li><Link href="/community" className="hover:text-purple-400">Community</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-purple-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-purple-400">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-purple-400">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-purple-400">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-purple-400">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-purple-400"><Facebook /></Link>
            <Link href="#" className="hover:text-purple-400"><Twitter /></Link>
            <Link href="#" className="hover:text-purple-400"><Instagram /></Link>
            <Link href="#" className="hover:text-purple-400"><Youtube /></Link>
            <Link href="#" className="hover:text-purple-400"><Github /></Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} EpicVault — All Rights Reserved.
      </div>
    </footer>
  );
}
