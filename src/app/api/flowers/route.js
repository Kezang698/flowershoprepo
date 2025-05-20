import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, price, imageUrl } = req.body;
      const flower = await prisma.flower.create({
        data: { name, price, imageUrl }
      });
      res.status(201).json(flower);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create flower' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}