"use client";
import { motion, useScroll } from "framer-motion";
import { Newspaper, PlayCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

const newsArticles = [
  {
    title: "PUBG Global Championship 2025 Kicks Off",
    description:
      "The PUBG Global Championship 2025 has officially started with top teams worldwide battling for the trophy.",
    image:
      "https://images.pexels.com/photos/9072217/pexels-photo-9072217.jpeg?auto=compress&cs=tinysrgb&w=1600",
    time: "2h ago",
    link: "/pubgnewspage",
  },
  {
    title: "League of Legends World Finals: Day 1 Highlights",
    description:
      "Intense matches marked the opening day of Worlds 2025, with underdogs surprising the giants.",
    image:
      "https://images.pexels.com/photos/7862546/pexels-photo-7862546.jpeg?auto=compress&cs=tinysrgb&w=1600",
    time: "5h ago",
    link: "/worldpage",
  },
  {
    title: "Tekken 8 Esports Heats Up",
    description:
      "Tekken 8 tournaments are drawing huge crowds, with legendary players facing off in high-stakes battles.",
    image:
      "data:image/jpeg;base64,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",
    time: "8h ago",
    link: "/takenpage",
  },
];

export default function EsportsNewsPage() {
  const { scrollY } = useScroll();

  return (
    <main className="bg-[#0f0f1a] min-h-screen text-white relative">
      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-twinkle {
          animation: twinkle 4s infinite;
        }
      `}</style>

      {/* 🌌 Starfield Background */}
      <div className="absolute inset-0 z-0">
        <Starfield scrollY={scrollY} />
      </div>

      {/* 🔥 Hero Section */}
      <section className="relative text-center py-24 px-6 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-4"
        >
          🎮 Live <span className="text-purple-400">Esports News</span>
        </motion.h1>
        <p className="max-w-2xl mx-auto text-gray-300 text-lg">
          Stay updated with the latest esports headlines, match results, and
          live highlights from around the globe.
        </p>
      </section>

      {/* 📰 News Grid */}
      <section className="px-6 py-16 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <Newspaper className="text-purple-400" />
          <h2 className="text-2xl font-bold">Latest Headlines</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((news, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#1a1a2e]/90 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{news.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{news.description}</p>
                <div className="flex items-center justify-between text-gray-400 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock size={16} /> {news.time}
                  </span>
                  <Link
                    href={news.link}
                    className="text-purple-400 hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🎥 Live Streams */}
      <section className="px-6 py-16 bg-[#1a1a2e]/80 relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <PlayCircle className="text-pink-400" />
          <h2 className="text-2xl font-bold">Live Now</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Dota 2: International Finals",
              streamer: "Twitch Esports",
              embed: "https://player.twitch.tv/?channel=esl_csgo&parent=localhost",
            },
            {
              title: "Valorant Champions Tour",
              streamer: "YouTube Gaming",
              embed:
                "https://www.youtube.com/embed/5S3A6GgxxsQ?si=3pJ9NftUgkLqzvlE",
            },
          ].map((live, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-black/90 rounded-xl overflow-hidden shadow-lg"
            >
              <iframe
                src={live.embed}
                title={live.title}
                allowFullScreen
                className="w-full h-64"
              ></iframe>
              <div className="p-4 text-gray-300">
                <h3 className="font-bold">{live.title}</h3>
                <p className="text-sm text-gray-400">
                  Streaming on {live.streamer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
