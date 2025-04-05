import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { accessToken: string } }
) {
  const { accessToken } = await params;

  try {
    const personInformation = await getPersonInformation(accessToken);
    const photo = validatePhoto("data:image/png;base64," + personInformation.photo.data) ? ("data:image/png;base64," + personInformation.photo.data) : "/default_user.png";;
    // Process user data
    const userData = {
      username: personInformation.username,
      displayName: personInformation.displayName,
      email: personInformation.email,
      courses: personInformation.courses,
      isActiveTecnicoStudent: personInformation.roles.includes('STUDENT'),
      campus: personInformation.campus,
      photo: photo
    };

    return NextResponse.json(userData);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 401 });
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

function validatePhoto(base64: string): boolean {
  // Regex to check if the base64 string is a valid image format (PNG, JPEG, JPG)
  const base64Regex = /^data:image\/(png|jpeg|jpg);base64,[A-Za-z0-9+/=]+$/;
  
  // Check if the base64 string matches the pattern
  if (!base64Regex.test(base64)) {
    return false;
  }
  
  // Remove the data URL prefix (e.g., "data:image/png;base64,")
  const base64Data = base64.split(',')[1];
  
  // Convert the base64 string to its byte length
  const byteLength = (base64Data.length * 3) / 4 - (base64Data.endsWith('==') ? 2 : base64Data.endsWith('=') ? 1 : 0);
  
  // Set the size limit (3MB)
  const maxSizeInBytes = 3 * 1024 * 1024; // 3MB

  // Check if the size exceeds the maximum limit
  return byteLength <= maxSizeInBytes;
}