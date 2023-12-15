"use client";
import { Card, CardSkeleton } from "@/components/card";
import Navbar from "@/components/navbar";
import { LandCertificate } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [certificate, setCertificate] = useState<LandCertificate[]>([]);
  useEffect(() => {
    getCertificate();
  }, []);
  async function getCertificate() {
    const res = await fetch("/api/land-certificate", {
      cache: "no-cache",
    });
    const data = await res.json();
    setCertificate(data.data);
  }
  if (!certificate[0]) {
    return (
      <>
        <Navbar />
        <div className="mx-[3%]">
          <div className="flex  gap-10 mt-10">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="w-full py-10 bg-gradient-to-r from-cyan-200 to-cyan-400">
        <h1 className="text-4xl text-center font-bold text-black">Landmark</h1>
        <p className="text-center text-xl mt-5 text-black">
          A decentralized land registry system prototype
        </p>
      </div>
      <div className="mx-[3%]">
        <div className="flex  gap-10 mt-10 flex-wrap ">
          {certificate.map((certificate) => (
            <Card {...certificate} />
          ))}
        </div>
      </div>
    </>
  );
}
