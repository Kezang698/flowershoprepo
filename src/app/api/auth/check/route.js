import { cookies } from 'next/headers';

// Lazy load PrismaClient
let prisma;

function getPrismaClient() {
  if (!prisma) {
    const { PrismaClient } = require('@prisma/client');
    prisma = new PrismaClient();
  }
  return prisma;
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

    const prismaClient = getPrismaClient();
    const user = await prismaClient.user.findUnique({
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
        details: process.env.NODE_ENV === 'development' ? error.message : undefined 
      },
      { status: 500 }
    );
  }
} 