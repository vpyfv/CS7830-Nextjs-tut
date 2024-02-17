import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-teal-600 py-4 px-2 text-lg text-white font-bold">
      <Link href={"/write"} className="me-4">
        AddPost
      </Link>
      <Link href={"/blog"} className="me-4">
        Posts
      </Link>
    </nav>
  );
}
