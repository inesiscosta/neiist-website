import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { username: string } }
) {
  const { username } = await context.params; // Await the params object
  const accessToken = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return NextResponse.json({ error: 'Access token is required' }, { status: 401 });
  }

  try {
    const url = `https://fenix.tecnico.ulisboa.pt/user/photo/${username}?s=10000`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`, // Use the access token to authenticate
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user photo');
    }

    const imageBuffer = await response.arrayBuffer();
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error fetching user photo:', error);
    return NextResponse.json({ error: 'Failed to fetch user photo' }, { status: 500 });
  }
}