// src/app/api/flowers/route.js

import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

// Handle POST request (Add new flower)
export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const price = formData.get('price');
    const imageFile = formData.get('image');

    if (!name || !price || !imageFile || typeof imageFile === 'string') {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Save the image to /public/uploads
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '')}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    const flower = await prisma.flower.create({
      data: {
        name,
        price: parseFloat(price),
        image: imageUrl,
      },
    });

    return new Response(JSON.stringify(flower), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Handle GET request (Get all flowers)
export async function GET() {
  try {
    const flowers = await prisma.flower.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return new Response(JSON.stringify(flowers), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
