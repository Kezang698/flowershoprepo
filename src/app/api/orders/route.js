import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401 }
      );
    }

    const { flowerId, quantity, total } = await request.json();

    if (!flowerId || !quantity || !total) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        flowerId,
        userId,
        quantity,
        total,
      },
      include: {
        flower: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({ message: 'Order created successfully', order }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Order creation error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create order' }),
      { status: 500 }
    );
  }
} 