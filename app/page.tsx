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
      <div className="mx-[3%]">
        <div className="flex  gap-10 mt-10">
          {certificate.map((certificate) => (
            <Card {...certificate} />
          ))}
        </div>
      </div>
    </>
  );
}
