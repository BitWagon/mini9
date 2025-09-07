"use client";
import { motion, useScroll } from "framer-motion";
import { Clock, ArrowLeft, Users, Trophy, Radio, Newspaper } from "lucide-react";
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

export default function LoLWorldsPage() {
  const { scrollY } = useScroll();

  // Live updates
  const liveUpdates = [
    { time: "10m ago", text: "Underdog Team Rising Phoenix stuns the reigning champions with a 2-0 sweep." },
    { time: "1h ago", text: "Mid-laner ShadowX pulls off a legendary pentakill, shaking the arena." },
    { time: "3h ago", text: "Opening ceremony amazes fans with spectacular music and lights." },
  ];

  return (
    <main className="bg-[#0f0f1a] min-h-screen text-white relative">
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: twinkle 4s infinite;
        }
      `}</style>

      {/* 🌌 Background */}
      <div className="absolute inset-0 z-0">
        <Starfield scrollY={scrollY} />
      </div>

      {/* 🔙 Back Link */}
      <div className="relative z-10 px-6 pt-6">
        <Link
          href="/news"
          className="flex items-center text-purple-400 hover:underline"
        >
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
          League of Legends World Finals: Day 1 Highlights
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 flex items-center justify-center gap-2"
        >
          <Clock size={16} /> 5h ago
        </motion.p>
      </section>

      {/* 🖼️ Featured Image */}
      <section className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.img
          src="https://images.pexels.com/photos/7915501/pexels-photo-7915501.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="League of Legends Worlds 2025"
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
          Intense matches marked the opening day of{" "}
          <span className="text-purple-400 font-semibold">Worlds 2025</span>, with
          underdogs surprising the giants and setting the stage for an
          unpredictable tournament.
        </motion.p>
      </section>

      {/* 📡 Live Updates */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Radio className="w-6 h-6 text-purple-400" /> Live Updates
        </h2>
        <div className="space-y-4">
          {liveUpdates.map((update, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#1a1a2e] p-4 rounded-lg shadow-md border border-purple-500/30"
            >
              <p className="text-sm text-purple-300">{update.time}</p>
              <p className="text-gray-200">{update.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🎮 Teams Spotlight */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Users className="w-6 h-6 text-purple-400" /> Teams to Watch
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Rising Phoenix", "Shadow Hunters", "Eclipse Titans"].map((team, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#1a1a2e] p-6 rounded-xl border border-purple-500/30 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-purple-300">{team}</h3>
              <p className="text-gray-400 mt-2 text-sm">
                Known for bold strategies and clutch plays on the big stage.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🏆 Prize Pool & Leaderboard */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Trophy className="w-6 h-6 text-purple-400" /> Prize Pool & Leaderboard
        </h2>
        <div className="bg-[#1a1a2e] p-6 rounded-lg shadow-md border border-purple-500/30">
          <p className="text-lg text-purple-300 mb-4">
            Total Prize Pool: <span className="font-bold">$6,000,000</span>
          </p>
          <ul className="space-y-2">
            <li className="flex justify-between text-gray-300">
              <span>🥇 Rising Phoenix</span> <span>200 pts</span>
            </li>
            <li className="flex justify-between text-gray-300">
              <span>🥈 Shadow Hunters</span> <span>170 pts</span>
            </li>
            <li className="flex justify-between text-gray-300">
              <span>🥉 Eclipse Titans</span> <span>150 pts</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 📝 Related News */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Newspaper className="w-6 h-6 text-purple-400" /> Related News
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "PUBG Global Championship 2025 Kicks Off",
              link: "/pubgnewspage",
            },
            {
              title: "Esports Market to Reach $3B by 2025",
              link: "/news/esports-market-2025",
            },
          ].map((article, i) => (
            <Link
              key={i}
              href={article.link}
              className="block bg-[#1a1a2e] p-6 rounded-lg border border-purple-500/30 hover:bg-purple-900/30 transition"
            >
              <h3 className="text-lg font-semibold text-purple-300">
                {article.title}
              </h3>
              <p className="text-sm text-gray-400 mt-2">Read More →</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
