import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User from '@models/user';
import dbConnect from '@lib/dbConnect';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await dbConnect()
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email as string });
      if (user) {
        const isCorrect = await bcrypt.compare(password as string, user.password);
        if (isCorrect) {
          res.status(200).json({ user });
        } else {
          res.status(401).json({ message: 'Invalid email or password' });
        }
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;