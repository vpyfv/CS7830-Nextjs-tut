import Link from "next/link";
import { Post } from "../lib/posts";

export default function PostCard(props: { post: Post }) {
  return (
    <div className="bg-white border rounded shadow w-80 hover:shadow-xl px-4 py-2 m-4">
      <Link href={`/blog/${props.post.id}`}>
        <h2 className="font-mono font-semibold py-1 text-center">{props.post.title}</h2>
        <p className="w-full line-clamp-5 pt-1 h-32">{props.post.body}</p>
      </Link>
    </div>
  );
}
