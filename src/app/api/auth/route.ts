import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { pin, password } = await req.json();

    const expectedPin = process.env.ADMIN_PIN || '1234';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin12345';

    if (pin === expectedPin || password === expectedPassword) {
      return NextResponse.json({
        success: true,
        token: `tajul_admin_${Date.now()}`,
        user: {
          name: 'Tajul Shahin',
          email: 'tajulshahin96@gmail.com',
          role: 'Administrator',
        },
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials. Default PIN is 1234.' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Authentication error' },
      { status: 500 }
    );
  }
}
