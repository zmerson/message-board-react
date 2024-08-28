import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Check if the HTTP method is GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract boardName from the URL parameters
  const { boardName } = req.query;

  try {
    const tags2 = await prisma.board.findFirst({
      where: {
        name: boardName,
      },
    });

    if (!tags2) {
      return res.status(404).json({ error: 'Board not found' });
    }

    res.json(tags2);
  } catch (error) {
    console.log("Error fetching board info:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}