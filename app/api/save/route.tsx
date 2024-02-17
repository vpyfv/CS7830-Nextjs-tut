import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.json();
  const filePath = "./public/posts.json";

  try {
    const file: any[] = JSON.parse(await fs.promises.readFile(filePath, "utf-8"));

    file.push(formData);
    var count = -1;
    for (var post of file) post.id = ++count;
    await fs.promises.writeFile(filePath, JSON.stringify(file));
    return NextResponse.json(
      {
        message: "Form data saved successfully",
        id: count,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "could not save form data" }, { status: 500 });
  }
}
