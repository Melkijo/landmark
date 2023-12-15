"use client";
import Navbar from "@/components/navbar";
import { LandCertificate } from "@/types";
import Image from "next/image";
import Link from "next/link";
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
        <>
          <div className="flex justify-center items-center h-screen">
            <h1>Loading...</h1>
          </div>
        </>
      ) : (
        <>
          {/* <Image
            src={`ipfs://${certificate[0].thumbnail}`}
            alt="sdf"
            width={500}
            height={500}
          /> */}
          <div className="mx-16">
            <img
              src="data:image/jpeg;base64,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"
              alt="Shoes"
              className="object-cover w-full h-96"
            />
            <h1 className="text-2xl font-bold py-5">LAND CERTIFICATE</h1>
            <h1>Owner: {certificate[0].owner}</h1>
            <h1>Owner ID: {certificate[0].owner_id}</h1>

            <h1>
              IPFS:{" "}
              <Link
                href={`ipfs://${certificate[0].thumbnail}`}
                target="_blank"
                className="underline underline-offset-2"
              >
                {certificate[0].thumbnail}
              </Link>
            </h1>
            <h1>Location: {certificate[0].location}</h1>
            <h1>Description: {certificate[0].description}</h1>
          </div>
        </>
      )}
    </>
  );
}
