import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    // const response = NextResponse.json({ success: true });
    const res = await cookies()
    res.delete('jwt');
    // response.cookies.delete('jwt'); // Cambia el nombre de la cookie
    return NextResponse.json("Congrats🫠");
}
