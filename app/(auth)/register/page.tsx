"use client";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
export default function Login() {
  const supabase = createClientComponentClient();

  return (
    <>
      <Link href="/">
        <p className="underline-offset-4">Back</p>
      </Link>
      <div className="flex justify-center flex-col items-center gap-5  h-[100vh]">
        <div className="w-96">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={["github"]}
          />
        </div>
      </div>
    </>
  );
}
