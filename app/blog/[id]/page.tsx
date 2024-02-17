"use client";
import { useEffect, useState } from "react";
import { Post, getPost, getPosts } from "../../../lib/posts";
import { redirect } from "next/navigation";

export default function DetailedPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post>({ body: "", id: -1, title: "" });

  useEffect(() => {
    getPost(params.id)
      .then((p) => {
        return setPost(p);
      })
      .catch(() => redirect("/blog"));
  }, [params.id]);

  return (
    <div className="flex flex-col items-center px-80">
      <h1 className="text-4xl py-3">{post.title}</h1>
      <p className="whitespace-pre-wrap">{post.body}</p>
    </div>
  );
}
