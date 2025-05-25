// Ensure Vercel uses Node.js runtime (not Edge)
export const runtime = 'nodejs';

import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of PrismaClient in development
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return Response.json({ user: null });
    }

    // Handle admin user case
    if (userId === 'admin') {
      return Response.json({
        user: {
          id: 'admin',
          email: 'kelz248@gmail.com',
          role: 'ADMIN',
          name: 'Admin User'
        }
      });
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
      return Response.json({ user: null });
    }

    return Response.json({ user });

  } catch (error) {
    console.error('Auth check error:', error);
    return Response.json(
      {
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
