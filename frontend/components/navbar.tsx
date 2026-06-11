"use client";

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  Show,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-neutral-200 bg-white">
      <Link href="/" className="text-lg font-bold text-emerald-700">
        match<span className="text-neutral-900">ai</span>
      </Link>

      <div className="flex items-center gap-4">
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </nav>
  );
}