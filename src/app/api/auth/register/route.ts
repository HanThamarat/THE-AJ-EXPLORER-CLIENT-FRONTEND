import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.AUTH_BACKEND_SECRET}`,
        },
        body: JSON.stringify(await request.json()),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.error }, { status: res.status });
    }
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}