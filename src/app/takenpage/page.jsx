"use client";
import { motion, useScroll } from "framer-motion";
import { Clock, ArrowLeft, Radio, Gamepad2, Newspaper, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// 🌌 Starfield Background
function Starfield({ scrollY }) {
  const containerRef = useRef(null);
  const [stars, setStars] = useState([]);
  const [scrollYValue, setScrollYValue] = useState(0);

  useEffect(() => {
    const newStars = Array.from({ length: 300 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setStars(newStars);
  }, []);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrollYValue(latest);
    });
  }, [scrollY]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-purple-400 animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${(i % 10) * 0.5}s`,
            transform: `translateY(${scrollYValue * 0.001}px)`,
            boxShadow: "0 0 10px 2px rgba(168, 85, 247, 0.7)",
          }}
        />
      ))}
    </div>
  );
}

export default function TekkenPage() {
  const { scrollY } = useScroll();

  return (
    <main className="bg-[#0f0f1a] min-h-screen text-white relative">
      {/* ✨ Twinkle animation */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-twinkle { animation: twinkle 4s infinite; }
      `}</style>

      {/* 🌌 Background */}
      <div className="absolute inset-0 z-0">
        <Starfield scrollY={scrollY} />
      </div>

      {/* 🔙 Back Link */}
      <div className="relative z-10 px-6 pt-6">
        <Link href="/" className="flex items-center text-purple-400 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
        </Link>
      </div>

      {/* 📰 Hero */}
      <section className="relative text-center py-16 px-6 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          Tekken 8 Esports Heats Up
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 flex items-center justify-center gap-2"
        >
          <Clock size={16} /> 8h ago
        </motion.p>
      </section>

      {/* 🖼️ Featured Image */}
      <section className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.img
          src="https://i.ibb.co/7XrLkjV/tekken-8.jpg"
          alt="Tekken 8 Tournament"
          className="rounded-xl shadow-lg w-full object-cover"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </section>

      {/* 📖 Article Content */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg text-gray-300 leading-relaxed mb-6"
        >
          <span className="text-purple-400 font-semibold">Tekken 8</span>{" "}
          tournaments are drawing massive audiences worldwide, bringing together
          iconic players and new challengers for unforgettable battles.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-300 leading-relaxed mb-6"
        >
          The esports scene is heating up as legendary fighters clash on the
          grand stage. Every round is filled with jaw-dropping combos, clutch
          recoveries, and edge-of-your-seat action that leaves fans craving
          more.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-lg text-gray-300 leading-relaxed"
        >
          With prize pools bigger than ever and international streaming
          coverage, Tekken 8 is cementing its place as a top-tier esport.
          Expect even fiercer rivalries as the tournament continues.
        </motion.p>
      </section>

      {/* 🔴 Live Updates */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <h2 className="flex items-center text-2xl font-bold text-purple-400 mb-6">
          <Radio className="w-6 h-6 mr-2" /> Live Updates
        </h2>
        <ul className="space-y-4">
          <li className="bg-[#1a1a2e] p-4 rounded-lg shadow">⚔️ Knee defeats Arslan Ash 2-1 in a thrilling comeback!</li>
          <li className="bg-[#1a1a2e] p-4 rounded-lg shadow">🔥 LowHigh advances to semi-finals with dominating 3-0 sweep.</li>
          <li className="bg-[#1a1a2e] p-4 rounded-lg shadow">💥 Crowd goes wild as JDCR lands a perfect round!</li>
        </ul>
      </section>

      {/* 📅 Upcoming Matches */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <h2 className="flex items-center text-2xl font-bold text-purple-400 mb-6">
          <Gamepad2 className="w-6 h-6 mr-2" /> Upcoming Matches
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1a1a2e] p-6 rounded-lg shadow">
            <p className="font-semibold">🏆 Arslan Ash vs Knee</p>
            <p className="text-gray-400">Starts in 2 hours</p>
          </div>
          <div className="bg-[#1a1a2e] p-6 rounded-lg shadow">
            <p className="font-semibold">🔥 JDCR vs LowHigh</p>
            <p className="text-gray-400">Starts in 5 hours</p>
          </div>
        </div>
      </section>

      {/* 📰 Related News */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <h2 className="flex items-center text-2xl font-bold text-purple-400 mb-6">
          <Newspaper className="w-6 h-6 mr-2" /> Related News
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#1a1a2e] p-4 rounded-lg shadow hover:shadow-xl transition">
            <p className="font-semibold">World Finals Day 1 Recap</p>
            <p className="text-gray-400 text-sm">Underdogs surprise the giants in a thrilling opener.</p>
          </div>
          <div className="bg-[#1a1a2e] p-4 rounded-lg shadow hover:shadow-xl transition">
            <p className="font-semibold">Tekken 8 Patch Notes Released</p>
            <p className="text-gray-400 text-sm">Balance changes shake up the tournament meta.</p>
          </div>
          <div className="bg-[#1a1a2e] p-4 rounded-lg shadow hover:shadow-xl transition">
            <p className="font-semibold">Top 10 Players to Watch</p>
            <p className="text-gray-400 text-sm">Who will dominate the Tekken 8 season?</p>
          </div>
        </div>
      </section>

      {/* 💬 Community Reactions */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <h2 className="flex items-center text-2xl font-bold text-purple-400 mb-6">
          <MessageSquare className="w-6 h-6 mr-2" /> Community Reactions
        </h2>
        <div className="space-y-4">
          <div className="bg-[#1a1a2e] p-4 rounded-lg shadow">💬 "That comeback by Knee was legendary!"</div>
          <div className="bg-[#1a1a2e] p-4 rounded-lg shadow">💬 "JDCR is playing out of his mind this tournament."</div>
          <div className="bg-[#1a1a2e] p-4 rounded-lg shadow">💬 "This is the best Tekken event I’ve seen in years."</div>
        </div>
      </section>
    </main>
  );
}
