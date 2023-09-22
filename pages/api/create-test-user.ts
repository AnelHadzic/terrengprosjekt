import { NextApiRequest, NextApiResponse } from 'next';
import connectToDb from '../../app/lib/mongoose';
import bootstrapDb from '@/app/lib/bootstrap-db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDb();

    bootstrapDb();

    res.status(200).json({ message: 'Database operation successful' });
  } catch (error) {
    console.error('Database operation error:', error);
    res.status(500).json({ error: 'Database operation error' });
  }
}