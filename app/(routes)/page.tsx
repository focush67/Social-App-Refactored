import ProfilesWrapper from "@/components/misc/home-page-profiles-wrapper";
import PostCard from "@/components/post-components/post-card";
import StorySidebar from "@/components/story-components/story-wrapper";
import { getAllPosts } from "@/server_actions/posts";
import React from "react";

const HomePageLayout = async () => {
  const posts = await getAllPosts();
  return (
    <div className="mt-12 py-8 flex h-[100vh]">
      <div className="w-1/6">
        <div className="font-semibold text-center">Stories</div>
        <StorySidebar />
      </div>
      <div className="w-3/5 ml-1">
        <div className="flex items-center">
          <div className="flex flex-col flex-1 gap-3 items-center w-fit">
            {posts.map((post, index) => (
              <div className="w-fit" key={index}>
                <PostCard key={post.id} post={post} size="small" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/5  ml-3">
        <h1 className="text-normal font-semibold text-center">Users</h1>
        <ProfilesWrapper />
      </div>
    </div>
  );
};

export default HomePageLayout;
