import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return new Response(
        JSON.stringify({ user: null }),
        { status: 200 }
      );
    }

    // Handle admin user case
    if (userId === 'admin') {
      return new Response(
        JSON.stringify({
          user: {
            id: 'admin',
            email: 'kelz248@gmail.com',
            role: 'ADMIN',
            name: 'Admin User'
          }
        }),
        { status: 200 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ user: null }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ user }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Auth check error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
} 