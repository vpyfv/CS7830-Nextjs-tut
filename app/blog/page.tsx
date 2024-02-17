"use client";
import { useEffect, useState } from "react";
import { Post, getPosts } from "../../lib/posts";
import PostCard from "../../components/postcard";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getPosts().then((postList) => setPosts(postList));
  }, []);

  return (
    <>
      <h1 className="py-5 text-3xl font-mono text-center">Posts</h1>
      <ul className="flex flex-row flex-wrap justify-center">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </ul>
    </>
  );
}
