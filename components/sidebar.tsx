"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [walletAddress, setWalletAddress] = useState("");
  const navLink = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Certificate", href: "/admin/certificate" },
  ];
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

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

  useEffect(() => {
    requestAccount();
  }, []);
  return (
    <div>
      <div className="flex justify-between w-[100%] bg-[#1E1E1E] p-5">
        <div>Wallet : {walletAddress}</div>
        <button onClick={handleSignOut} className="btn btn-error">
          Logout
        </button>
      </div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col  ">
          <div>{children}</div>

          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {navLink.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={
                      isActive
                        ? "text-blue-200"
                        : "text-white hover:font-semibold"
                    }
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
