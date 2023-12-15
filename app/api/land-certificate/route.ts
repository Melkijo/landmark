import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib";


export async function GET(request: Request) {
    const {data} = await supabase.from('land_certificate').select('*');
    return NextResponse.json( {data} );
}


export async function POST(request: NextRequest) {
    const body =await request.json();
    await supabase.from('land_certificate').insert(body.data);
    //redirect to admin/kegiatan
    return NextResponse.json( {message:"this worked", success: true} );

    
}