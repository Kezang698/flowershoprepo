import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { rating, name, email, review, photos } = await request.json();
    const newReview = await prisma.review.create({
      data: {
        rating,
        name,
        email,
        review,
        photos: photos || [],
      },
    });
    return new Response(JSON.stringify(newReview), { status: 201 });
  } catch (error) {
    console.error('Review creation error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create review' }), { status: 500 });
  }
} 