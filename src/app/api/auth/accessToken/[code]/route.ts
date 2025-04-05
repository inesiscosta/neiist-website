import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, context: { params: { code: string } }) {
  const { code } = await context.params; // Await the params object

  try {
    const url = `https://fenix.tecnico.ulisboa.pt/oauth/access_token?client_id=${process.env.FENIX_CLIENT_ID}&client_secret=${encodeURIComponent(process.env.FENIX_CLIENT_SECRET || '')}&redirect_uri=${process.env.FENIX_REDIRECT_URI}&code=${encodeURIComponent(code)}&grant_type=authorization_code`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({ access_token: data.access_token });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}