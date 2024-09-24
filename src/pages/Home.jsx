import React from "react";
import Navbar from "../component/Navbar";
import Profile from "../component/Profile";
import Post from "../component/Post";
import Recommend from "../component/Recommend";
import PostFeed from "../component/PostFeed";

function Home() {
  return (
    <div className="bg-[#f4f2ee] h-[100%]">
      <Navbar />
      <div className="grid grid-cols-5 mx-16 gap-6">
        <Profile />
        <div className="col-span-3">
          <Post />
          <hr className="text-gray-950" />
          <PostFeed />
        </div>
        <Recommend />
      </div>
    </div>
  );
}

export default Home;
