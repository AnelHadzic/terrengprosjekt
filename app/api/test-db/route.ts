import connectToDb from "@/app/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Connect to the database
        await connectToDb();
    
        // Perform database operation
        // Example: const result = await YourModel.find({});
        // Replace YourModel with your actual Mongoose model
        //
    
        //res.status(200).json({ message: 'Database operation successful' });
        return NextResponse.json(
            { data: "Connected successfully" },
            { status: 200 },
          )
      } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json(
            { data: "Could not connect to database" },
            { status: 500 },
          )
      }
}