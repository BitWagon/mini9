"use client";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { Star, Trophy, Flame } from "lucide-react";
import { useRef, useEffect, useState } from "react";

// 🌌 CSS Starfield component
function Starfield({ scrollY }) {
  const containerRef = useRef(null);
  const [stars, setStars] = useState([]);
  const [scrollYValue, setScrollYValue] = useState(0);  // Fix: track scrollY state

  useEffect(() => {
    // Create 300 stars with random positions
    const newStars = Array.from({ length: 300 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setStars(newStars);
  }, []);

  useEffect(() => {
    // Subscribe to scrollY changes and update local state
    return scrollY.onChange((latest) => {
      setScrollYValue(latest);
    });
  }, [scrollY]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden"
    >
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
            transform: `translateY(${scrollYValue * 0.001}px)`, // use state here
            boxShadow: "0 0 10px 2px rgba(168, 85, 247, 0.7)",
          }}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const { scrollY } = useScroll();

  return (
    <main className="bg-[#0f0f1a] text-white min-h-screen relative">
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: twinkle 4s infinite;
        }
      `}</style>
      
      {/* 🚀 Hero Section with Starfield Background */}
      <section className="relative text-center py-24 px-6 overflow-hidden">
        {/* 🪐 Starfield Background */}
        <div className="absolute inset-0 z-0">
          <Starfield scrollY={scrollY} />
        </div>

        {/* 🌟 Hero Content */}
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold mb-6"
          >
            Welcome to <span className="text-purple-400">EpicVault</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl mx-auto text-gray-300 mb-8"
          >
            Your ultimate gaming hub — discover trending games, esports tournaments,
            and in-depth reviews. Level up your journey with us.
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/tournaments"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition"
            >
              Explore Tournaments
            </Link>
          </motion.div>
        </div>
      </section>

     {/* 🔥 Trending Games */}
        <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
            <Flame className="text-purple-400" />
            <h2 className="text-2xl font-bold">Trending Games</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
            {
                name: "PUBG",
                imageUrl: "https://images.pexels.com/photos/4526481/pexels-photo-4526481.jpeg?_gl=1*wkocmd*_ga*MTc4NzI1ODA4NC4xNzI1ODg5NTEy*_ga_8JE65Q40S6*czE3NTcxMDMwMDYkbzI1JGcxJHQxNzU3MTAzMDE5JGo0NyRsMCRoMA..",  // Add your image path here
            },
            {
                name: "League of Legends",
                imageUrl: "https://images.pexels.com/photos/12325254/pexels-photo-12325254.jpeg?_gl=1*gqfsyt*_ga*MTc4NzI1ODA4NC4xNzI1ODg5NTEy*_ga_8JE65Q40S6*czE3NTcxMDMwMDYkbzI1JGcxJHQxNzU3MTAzMzY5JGo1OSRsMCRoMA..",
            },
            {
                name: "CHESS",
                imageUrl: "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?_gl=1*1nc6fjx*_ga*MTc4NzI1ODA4NC4xNzI1ODg5NTEy*_ga_8JE65Q40S6*czE3NTcxMDMwMDYkbzI1JGcxJHQxNzU3MTAzNTYxJGo1OSRsMCRoMA..",
            },
            ].map((game, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#1a1a2e] rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
            >
                {/* Image added here */}
                <img
                src={game.imageUrl}
                alt={game.name}
                className="w-full h-40 object-cover"
                />
                <div className="p-4 text-gray-300">
                <h3 className="text-xl font-bold mb-2">{game.name}</h3>
                <p>
                    Join millions of players worldwide in {game.name} — the most hyped
                    title right now.
                </p>
                </div>
            </motion.div>
            ))}
        </div>
        </section>


      {/* 🏆 Tournaments */}
      <section className="px-6 py-16 bg-[#1a1a2e]">
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="text-yellow-400" />
          <h2 className="text-2xl font-bold">Upcoming Tournaments</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "PUBG Esports", date: "Sept 20, 2025" },
            { title: "CHESS", date: "Oct 5, 2025" },
          ].map((tournament, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#0f0f1a] rounded-xl shadow-lg p-6 hover:shadow-purple-600/30 transition"
            >
              <h3 className="text-xl font-semibold">{tournament.title}</h3>
              <p className="text-gray-400">{tournament.date}</p>
              <Link
                href="/tournaments"
                className="text-purple-400 text-sm mt-3 inline-block hover:underline"
              >
                View Details →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ⭐ Reviews */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Star className="text-yellow-400" />
          <h2 className="text-2xl font-bold">Latest Reviews</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Elden Ring", rating: "9.5/10" },
            { title: "Cyberpunk 2077", rating: "8.0/10" },
            { title: "God of War", rating: "9.8/10" },
          ].map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#1a1a2e] rounded-xl shadow-lg p-6 hover:shadow-yellow-400/30 transition"
            >
              <h3 className="text-xl font-semibold">{review.title}</h3>
              <p className="text-gray-400">Rating: {review.rating}</p>
              <Link
                href="/reviews"
                className="text-purple-400 text-sm mt-3 inline-block hover:underline"
              >
                Read Review →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
