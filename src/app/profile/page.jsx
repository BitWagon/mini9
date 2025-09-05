"use client";
import { useState, useEffect } from "react";
import { Edit2, User, Users, Trophy, Calendar } from "lucide-react";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    bio: "",
    email: "",
    joinDate: "Jan 2023",
    followers: 0,
    following: 0,
    trophies: 0,
    recentActivities: [],
    socials: {
      twitter: "",
      twitch: "",
      youtube: "",
    },
  });

  // Fetch profile data on mount
  useEffect(() => {
    async function getProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile({
            name: data.name || "",
            username: data.username || "",
            bio: data.bio || "",
            email: data.email || "",
            joinDate: data.joinDate || "Jan 2023",
            followers: data.followers || 0,
            following: data.following || 0,
            trophies: data.trophies || 0,
            recentActivities: data.recentActivities || [],
            socials: data.socials || { twitter: "", twitch: "", youtube: "" },
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }
    getProfile();
  }, []);

  // Save profile to backend
  async function saveProfile(updatedProfile) {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        console.log("Saved:", data);
      } else {
        console.error("Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  }

  // Handle changes, including nested socials
  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("socials.")) {
      const key = name.split(".")[1];
      setProfile((prev) => ({
        ...prev,
        socials: {
          ...prev.socials,
          [key]: value,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  return (
    <main className="bg-[#0f0f1a] min-h-screen text-white flex justify-center py-16 px-4">
      <section className="max-w-3xl w-full bg-[#1a1a2e] rounded-xl shadow-lg p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold flex items-center gap-3">
            <User className="text-purple-400" /> Profile
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setEditing(!editing)}
              className="text-purple-400 hover:text-purple-600 flex items-center gap-1 font-semibold"
            >
              <Edit2 size={18} />
              {editing ? "Cancel" : "Edit"}
            </button>

            {editing && (
              <button
                onClick={() => {
                  saveProfile(profile);
                  setEditing(false); // Exit edit mode after save
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold"
              >
                Confirm
              </button>
            )}
          </div>
        </header>

        {/* Profile Info */}
        <div className="mb-8">
          <label className="block mb-1 text-gray-400 font-semibold">Display Name</label>
          {editing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-[#0f0f1a] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          ) : (
            <p className="text-xl font-bold">{profile.name}</p>
          )}

          <label className="block mt-4 mb-1 text-gray-400 font-semibold">Username</label>
          {editing ? (
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-[#0f0f1a] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          ) : (
            <p className="text-purple-400">@{profile.username}</p>
          )}

          <label className="block mt-4 mb-1 text-gray-400 font-semibold">Bio</label>
          {editing ? (
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 rounded-md bg-[#0f0f1a] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            />
          ) : (
            <p className="italic text-gray-300">{profile.bio}</p>
          )}

          <label className="block mt-4 mb-1 text-gray-400 font-semibold">Email</label>
          {editing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-[#0f0f1a] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          ) : (
            <p>{profile.email}</p>
          )}

          <p className="mt-4 text-gray-500 flex items-center gap-2">
            <Calendar size={16} /> Joined {profile.joinDate}
          </p>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-6 mb-8 text-center">
          <div className="bg-[#0f0f1a] rounded-lg py-4">
            <Users className="mx-auto text-purple-400 mb-1" size={28} />
            <p className="font-bold text-lg">{profile.followers.toLocaleString()}</p>
            <p className="text-gray-400 text-sm">Followers</p>
          </div>
          <div className="bg-[#0f0f1a] rounded-lg py-4">
            <User className="mx-auto text-purple-400 mb-1" size={28} />
            <p className="font-bold text-lg">{profile.following.toLocaleString()}</p>
            <p className="text-gray-400 text-sm">Following</p>
          </div>
          <div className="bg-[#0f0f1a] rounded-lg py-4">
            <Trophy className="mx-auto text-yellow-400 mb-1" size={28} />
            <p className="font-bold text-lg">{profile.trophies}</p>
            <p className="text-gray-400 text-sm">Trophies</p>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-purple-600 pb-2">
            Recent Activity
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {profile.recentActivities.map((act, idx) => (
              <li key={idx}>{act}</li>
            ))}
          </ul>
        </section>

        {/* Social Links */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b border-purple-600 pb-2">
            Social Links
          </h2>
          <div className="flex gap-6">
            {editing ? (
              <>
                <input
                  type="text"
                  name="socials.twitter"
                  value={profile.socials.twitter}
                  placeholder="Twitter URL"
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-[#0f0f1a] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <input
                  type="text"
                  name="socials.twitch"
                  value={profile.socials.twitch}
                  placeholder="Twitch URL"
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-[#0f0f1a] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <input
                  type="text"
                  name="socials.youtube"
                  value={profile.socials.youtube}
                  placeholder="YouTube URL"
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-[#0f0f1a] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </>
            ) : (
              <>
                {profile.socials.twitter && (
                  <a
                    href={profile.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Twitter
                  </a>
                )}
                {profile.socials.twitch && (
                  <a
                    href={profile.socials.twitch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800"
                  >
                    Twitch
                  </a>
                )}
                {profile.socials.youtube && (
                  <a
                    href={profile.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-800"
                  >
                    YouTube
                  </a>
                )}
              </>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
