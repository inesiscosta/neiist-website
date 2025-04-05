import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { accessToken: string } }
) {
  const { accessToken } = params;

  try {
    const personInformation = await getPersonInformation(accessToken);

    // Process user data
    const userData = {
      username: personInformation.username,
      displayName: personInformation.displayName,
      email: personInformation.email,
      courses: personInformation.courses,
      isActiveTecnicoStudent: personInformation.roles.includes('STUDENT'),
      isAdmin: personInformation.roles.includes('ADMIN'),
      isGacMember: personInformation.roles.includes('GAC'),
    };

    return NextResponse.json(userData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

async function getPersonInformation(accessToken: string) {
  const url = `https://fenix.tecnico.ulisboa.pt/api/fenix/v1/person?access_token=${accessToken}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to get person information');
  }

  return response.json();
}