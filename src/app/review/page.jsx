"use client";
import { motion, useScroll } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown, ArrowLeft } from "lucide-react";
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

export default function EsportsReviewPage() {
  const { scrollY } = useScroll();

  const reviews = [
    {
      game: "Tekken 8",
      rating: 4.8,
      review:
        "Incredible graphics, balanced gameplay, and the esports scene is thriving with intense rivalries!",
      reviewer: "ProGamerX",
      likes: 320,
      dislikes: 12,
    },
    {
      game: "League of Legends Worlds 2025",
      rating: 4.6,
      review:
        "The production quality is unmatched. Crowd energy and underdog wins made it unforgettable.",
      reviewer: "EsportsFanatic",
      likes: 290,
      dislikes: 20,
    },
    {
      game: "Valorant Champions Tour",
      rating: 4.4,
      review:
        "High skill ceiling, incredible plays, but sometimes pacing feels slow. Still a must-watch.",
      reviewer: "TacticalShooter",
      likes: 250,
      dislikes: 35,
    },
  ];

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
          🎮 Esports Reviews & Ratings
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 text-lg"
        >
          Honest takes from fans & pros on the latest tournaments and games.
        </motion.p>
      </section>

      {/* ⭐ Reviews Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-[#1a1a2e]/90 rounded-xl shadow-lg p-6 hover:scale-105 transition"
          >
            <h3 className="text-xl font-bold mb-2 text-purple-400">{item.game}</h3>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, starIndex) => (
                <Star
                  key={starIndex}
                  size={18}
                  className={
                    starIndex < Math.round(item.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-500"
                  }
                />
              ))}
              <span className="ml-2 text-sm text-gray-400">({item.rating})</span>
            </div>
            <p className="text-gray-300 mb-4">{item.review}</p>
            <p className="text-sm text-gray-500 mb-4">— {item.reviewer}</p>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span className="flex items-center gap-1">
                <ThumbsUp size={16} className="text-green-400" /> {item.likes}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsDown size={16} className="text-red-400" /> {item.dislikes}
              </span>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
