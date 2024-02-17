import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function GET(req: NextRequest, res: NextResponse) {
  const filePath = "./public/posts.json";

  try {
    const file = JSON.parse(await fs.promises.readFile(filePath, "utf-8"));

    return NextResponse.json(
      {
        message: "posts fetched successfully",
        posts: file,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "unable to fetch posts", error }, { status: 500 });
  }
}
