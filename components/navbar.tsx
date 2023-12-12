import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-300 px-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          Landmark
        </a>
      </div>
      <div className="flex gap-5">
        <Link href="/login">
          <button className="btn btn-ghost">Login</button>
        </Link>
        <Link href="/register">
          <button className="btn btn-ghost">Register</button>
        </Link>
      </div>
    </div>
  );
}
