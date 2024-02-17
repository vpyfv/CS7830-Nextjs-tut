"use client";
import { useState, useEffect } from "react";
import Form from "../../components/form";
import { Post, getPosts } from "../../lib/posts";
import PostCard from "../../components/postcard";

export default function Write() {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Post) => {
    const temp = [...posts];
    temp.push(post);
    setPosts(temp);
  };

  useEffect(() => {
    getPosts().then((p) => setPosts(p));
  }, []);

  return (
    <div className="flex items-center flex-wrap flex-col">
      <Form addpost={addPost} />
      <div className="flex flex-row justify-around">
        {(posts.length < 3 ? posts : posts.slice(posts.length - 3)).reverse().map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
