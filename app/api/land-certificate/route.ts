import { NextResponse } from "next/server"
import { supabase } from "@/lib";


export async function GET(request: Request) {
    const {data} = await supabase.from('land_certificate').select('*');
    return NextResponse.json( {data} );
}