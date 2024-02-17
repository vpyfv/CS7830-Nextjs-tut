import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { Post } from "../../../lib/posts";

export async function GET(req: NextRequest, res: NextResponse) {
  return await kv
    .hgetall("posts:all")
    .then((postList) => {
      return postList!["posts"] as Post[];
    })
    .then((posts) =>
      NextResponse.json(
        {
          message: "posts fetched successfully",
          posts: posts,
        },
        { status: 200 }
      )
    )
    .catch((err) => NextResponse.json({ message: "unable to fetch posts", err }, { status: 500 }));
}
