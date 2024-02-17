import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { Post } from "../../../lib/posts";

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.json();
  var id: number;

  return await kv
    .hget("posts:all", "posts")
    .then((postList) => {
      const posts = postList as Post[];
      id = posts.length;
      return posts;
    })
    .then((posts) =>
      kv.hset("posts:all", {
        posts: [
          ...posts,
          {
            title: formData.title,
            body: formData.body,
            id: id,
          },
        ],
      })
    )
    .then(() => kv.hget("posts:all", "posts"))
    .then((p) => console.log(p))
    .then(() =>
      NextResponse.json(
        {
          message: "Form data saved successfully",
          id: id,
        },
        { status: 200 }
      )
    )
    .catch((err) => NextResponse.json({ error: "could not save form data" }, { status: 500 }));
}
