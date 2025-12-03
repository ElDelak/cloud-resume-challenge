import React from "react";
import { NavLink } from "react-router-dom";
import "css/pages/home.css";
import me from "images/me.jpeg";
import ViewCounter from "comps/ViewCounter";
import linksData from "data/linksData.json";
import blogData from "data/blogData.json";
import PostItem from "comps/PostItem";

export default function HomePage() {
  const sortedBlogData = [...blogData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return (
    <>
      <div className="tailwind-scope">
        <h1 className="fancy text-4xl font-bold text-center mt-10 mb-12">
          Mabrouk-engineering Blog
        </h1>

        <ViewCounter />

        <div className="max-w-6xl w-full mx-auto flex justify-between items-start mt-10 px-6">
          {/* Left: Intro image */}
          <div className="intro_video w-64 h-80 rounded-xl shadow-lg overflow-hidden flex items-center justify-center bg-white">
            <img src={me} className="w-full h-full object-cover" />
          </div>

          {/* Middle: Links (vertically centered) */}
          <div className="links bg-white rounded-xl shadow-lg p-6 w-64 self-center">
            {linksData.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                className="flex items-center gap-3 text-gray-800 hover:text-blue-600 transition py-1"
              >
                <span
                  className="icon w-6 h-6"
                  dangerouslySetInnerHTML={{ __html: link.icon }}
                />
                <span className="name font-medium">{link.name}</span>
              </a>
            ))}
          </div>

          {/* Right: Posts */}
          <section className="posts bg-white rounded-xl shadow-lg p-6 w-72">
            <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
            {sortedBlogData.map((post) => (
              <PostItem key={post.handle} post={post} />
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
