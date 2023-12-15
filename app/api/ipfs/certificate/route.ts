import { NextResponse } from "next/server";

export async function GET(request:Request) {
    const res = await fetch("https://api.pinata.cloud/data/pinList?status=pinned", {
        method : 'GET',
        headers: {
            accept: "application/json",
            authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
        });

        const data = await res.json()
        return NextResponse.json({data})
}