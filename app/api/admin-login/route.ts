
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

 try {
    const raw = await req.text();
    const params = new URLSearchParams(raw);
    const key =params.get('key') || '';

    const adminKey = process.env.ADMIN_KEY || '';

    const originURL = new URL(req.url);
    const base = `${originURL.protocol}//${originURL.host}`;

    if (adminKey && key === adminKey) {
      const res = NextResponse.redirect(`${base}/admin`, { status: 303 });
      res.cookies.set('admin_key', adminKey, { 
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: false,
      });
      return res;
    }
 
    return NextResponse.redirect(`${base}/admin/login`, { status: 303 });
  } catch (error) {
    const url = new URL(req.url);
    return NextResponse.redirect(`${url.origin}/admin/login?error=unexpected`, { status: 303 });
  }
}