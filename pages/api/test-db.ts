// pages/api/test-db.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDb from '../../app/lib/mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to the database
    await connectToDb();

    // Perform database operation
    // Example: const result = await YourModel.find({});
    // Replace YourModel with your actual Mongoose model

    res.status(200).json({ message: 'Database operation successful' });
  } catch (error) {
    console.error('Database operation error:', error);
    res.status(500).json({ error: 'Database operation error' });
  }
}