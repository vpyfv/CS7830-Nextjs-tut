import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { Post } from "../../../../lib/posts";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const filePath = "./public/posts.json";
  try {
    const file = JSON.parse(await fs.promises.readFile(filePath, "utf-8")) as Post[];

    const post = file.find((item) => item.id.toString() === params.id);
    return post === undefined
      ? Response.json({ error: "could not find the post" }, { status: 404 })
      : Response.json({ message: "post fetched successfully", post: post });
  } catch (err) {
    Response.json({ error: "error fetching data", err }, { status: 500 });
  }
}
