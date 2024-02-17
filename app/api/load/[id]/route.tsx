import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { Post } from "../../../../lib/posts";
import { kv } from "@vercel/kv";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  return await kv
    .hgetall("posts:all")
    .then((postList) => postList!["posts"] as Post[])
    .then((postList) => {
      return postList.find((p) => p.id.toString() === params.id);
    })
    .then((post) =>
      post === undefined
        ? Response.json({ error: "could not find the post" }, { status: 404 })
        : Response.json({ message: "post fetched successfully", post: post })
    )
    .catch((err) => Response.json({ error: "error fetching data", err }, { status: 500 }));
}
