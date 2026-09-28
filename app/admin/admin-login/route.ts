import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Get credentials from environment variables
        const validUsername = process.env.ADMIN_USERNAME;
        const validPassword = process.env.ADMIN_PASSWORD;

        // Check if credentials match
        if (username === validUsername && password === validPassword) {
            // In a real app, you should generate a secure JWT token here.
            // For simplicity, we'll just return a success message and a dummy token.
            // NEVER send the actual password back to the frontend.

            const fakeToken = "secure_bearer_token_xyz123";

            return NextResponse.json({
                success: true,
                token: fakeToken
            }, { status: 200 });
        }

        // If credentials don't match
        return NextResponse.json(
            { success: false, message: 'Invalid credentials' },
            { status: 401 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}