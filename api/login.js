import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("user from server was: " + JSON.stringify(user));

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(user, 'your_secret_key', { expiresIn: '1h' });

    res.json({ user, token });
  } catch (error) {
    console.log("error2 was: " + error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
