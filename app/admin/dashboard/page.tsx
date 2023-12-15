"use client";
import { Card, CardStored } from "@/components/card";
import Sidebar from "@/components/sidebar";
import { supabase } from "@/lib";
import { LandCertificate } from "@/types";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";

export default function Page() {
  const [walletAddress, setWalletAddress] = useState("");
  const [certificate, setCertificate] = useState<LandCertificate[]>([]);

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
    getCertificate();
  }, []);

  async function getCertificate() {
    const res = await fetch("/api/land-certificate", {
      cache: "no-cache",
    });
    const data = await res.json();
    setCertificate(data.data);
  }
  //fetch user session data
  const handleCheckSession = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);
  };
  return (
    <Sidebar>
      <div className="mx-[3%]">
        <h1 className="text-2xl font-bold pt-5">Your Land Certificates</h1>
        <div className="flex  gap-10 mt-10 flex-wrap ">
          {certificate.map((certificate) =>
            certificate.owner_id === walletAddress ? (
              <CardStored {...certificate} />
            ) : null
          )}
        </div>
      </div>
    </Sidebar>
  );
}
