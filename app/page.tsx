"use client";

import PostCard from "@/components/post/post-card";
import SkeletonRender from "@/components/post/skeleton";
import { Post } from "@/types/post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  fetchSaved,
  fetchUsers,
} from "@/redux_store/slices/async-thunks";
import { AppDispatch } from "@/redux_store/store";

import { useSession } from "next-auth/react";

import { selectAllPosts } from "@/redux_store/slices/posts/post-slice";
import { addNewUser } from "@/redux_store/slices/users/user-slice";

import axios from "axios";
export default function Home() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
    dispatch(fetchSaved(session?.user?.email!));
  }, [dispatch, session]);

  useEffect(() => {
    const registerUser = async () => {
      const response = await axios.post(`/api/register`, {
        email: session?.user?.email,
        userName: session?.user?.name,
        image: session?.user?.image,
      });

      if (response.data.status === 201) {
        dispatch(addNewUser(response.data.user));
      }
    };

    registerUser();
  }, [session]);

  const posts = useSelector(selectAllPosts);

  if (!posts || posts?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <SkeletonRender />
        <SkeletonRender />
        <SkeletonRender />
        <SkeletonRender />
        <SkeletonRender />
        <SkeletonRender />
        <SkeletonRender />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3">
      {posts?.map((post: Post, index: number) => (
        <div className="m-2 lg:flex-row md:flex-row sm:flex-col" key={index}>
          <PostCard post={post} key={index} />
        </div>
      ))}
    </main>
  );
}
