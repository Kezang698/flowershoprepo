import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { status: 400 }
      );
    }

    // Hardcoded admin credentials check
    if (email === 'kelz248@gmail.com' && password === '87654321') {
      const cookieStore = cookies();
      cookieStore.set('userId', 'admin', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

      return new Response(
        JSON.stringify({
          message: 'Admin login successful',
          user: { email, role: 'ADMIN' },
        }),
        { status: 200 }
      );
    }

    // Find user by email in database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }),
        { status: 401 }
      );
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }),
        { status: 401 }
      );
    }

    // Set user cookie
    const cookieStore = cookies();
    cookieStore.set('userId', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    // Authentication successful, return user info without password
    const { password: _password, ...userWithoutPassword } = user;

    return new Response(
      JSON.stringify({ message: 'Login successful', user: userWithoutPassword }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
