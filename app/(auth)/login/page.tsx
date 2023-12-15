"use client";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [walletAddress, setWalletAddress] = useState("");

  const requestAccount = async () => {
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    router.push("/admin/dashboard");
    // const { data } = await supabase.auth.signInWithPassword({
    //   email: email,
    //   password: password,
    // });

    // if (data.session !== null) {
    //   router.push("/admin/dashboard");
    //   setLoading(false);
    // } else {
    //   alert("Email atau password salah");
    //   setLoading(false);
    // }
  };

  return (
    <>
      <Link href="/">
        <button className="p-5 underline underline-offset-2">Back</button>
      </Link>
      <div className="flex justify-center flex-col items-center gap-5  h-[100vh]">
        <h1 className="text-[25px] font-bold md:text-[40px] leading-none  ">
          LOGIN
        </h1>

        {/* <form action="">
          <div className="flex flex-col w-72 gap-5">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="input input-bordered w-full max-w-xs"
              placeholder="Email"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="input input-bordered w-full max-w-xs"
              placeholder="Password"
            />

            <button
              onClick={handleSignIn}
              className="btn btn-accent"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form> */}
        <button
          className="btn btn-accent"
          onClick={requestAccount}
          disabled={walletAddress == "" ? false : true}
        >
          Connect Wallet
        </button>
        <div>Wallet Address {walletAddress}</div>
        {walletAddress && (
          <button
            onClick={handleSignIn}
            className="btn btn-accent"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Go to dashboard"
            )}
          </button>
        )}
      </div>
    </>
  );
}
