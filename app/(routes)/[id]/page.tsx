"use client";

import useFetchCurrentUser from "@/custom_hooks/fetching_hooks/useFetchCurrentUser";
import useFetchUserPosts from "@/custom_hooks/fetching_hooks/useFetchUserPosts";
import React, { useEffect } from "react";
import PostCard from "@/components/post/post-card";
import ProfileCard from "@/components/profile/profile-card";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/state";
import useFetchAllUsers from "@/custom_hooks/fetching_hooks/useFetchAllUsers";
import {
  addAllUsers,
  addPostsChunk,
  resetPosts,
} from "@/redux_store/slices/global-slices";
import { UserProfile } from "@/types/profile";
import { Post } from "@/types/post";

const Profile = ({ params }: any) => {
  let email = params.id.slice(0, params.id.indexOf("%"));
  email = email.concat("@gmail.com");

  const { posts } = useFetchUserPosts({ email });
  const { users } = useFetchAllUsers();
  const dispatch = useDispatch();

  useEffect(() => {
    if (posts && posts.length > 0) {
      dispatch(addPostsChunk(posts));
    }

    if (users && users.length > 0) {
      dispatch(addAllUsers(users));
    }
    return () => {
      console.log("Resetting state");
      dispatch(resetPosts());
    };
  }, [posts, dispatch]);

  const allUsers = useSelector((state: GlobalState) => state.users);

  const profileUser = allUsers.find(
    (user: UserProfile) => user.email === email
  );

  const allPosts = useSelector((state: GlobalState) => state.posts);

  const filteredPosts: Post[] = allPosts.filter(
    (post: Post) => post.email === email
  );

  return (
    <>
      <div className="flex items-center justify-center mt-1">
        <ProfileCard profile={profileUser!} />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mt-4 gap-4 ">
        {filteredPosts?.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </>
  );
};

export default Profile;
