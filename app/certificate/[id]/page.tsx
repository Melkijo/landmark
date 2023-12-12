"use client";
import Navbar from "@/components/navbar";
import { LandCertificate } from "@/types";
import { useEffect, useState } from "react";

export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  const [certificate, setCertificate] = useState<LandCertificate[]>([]);
  useEffect(() => {
    getCertificate();
  }, []);
  async function getCertificate() {
    const res = await fetch(`/api/land-certificate/${params.id}`, {
      cache: "no-cache",
    });
    const data = await res.json();
    setCertificate(data.data);
  }

  return (
    <>
      <Navbar />
      {!certificate[0] ? (
        "Loading bang..."
      ) : (
        <>
          <h1>Page {certificate[0].id}</h1>
          <h1>Owner: {certificate[0].owner}</h1>
          <h1>Location: {certificate[0].location}</h1>
          <h1>Description: {certificate[0].description}</h1>
        </>
      )}
    </>
  );
}
