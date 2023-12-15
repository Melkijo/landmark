import next from "next";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const data = await request.formData()

      
      try {
        const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method : 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.PINATA_JWT}`,
            },
            body: data
            });
            const jsonResponse = await res.json();
            const ipfsHash = jsonResponse.IpfsHash; // Extract the hash from the "IpfsHash" property
           
            console.log("IPFS Hash:", ipfsHash);
           return NextResponse.json({ipfsHash})
        } catch (error) {
            console.log(error)
        }

}

