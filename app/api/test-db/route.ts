import connectToDb from "@/app/lib/db/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Connect to the database
        await connectToDb();
    
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