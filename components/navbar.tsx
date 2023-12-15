"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
      </div>
    </div>
  );
}
