import { NextRequest,NextResponse } from "next/server"
import { supabase } from "@/lib";


export async function GET(request: Request, {params}: {params: {id: string}}) {
    const {data} = await supabase.from('land_certificate').select('*').eq('id', params.id);
    return NextResponse.json( {data} );
}