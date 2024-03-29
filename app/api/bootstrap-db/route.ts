import bootstrapDb from "@/app/lib/db/bootstrap-db";
import connectToDb from "@/app/lib/db/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDb();

        bootstrapDb();

        return NextResponse.json(
            { data: "Database operation successful" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database operation error:", error);
        return NextResponse.json(
            { data: "Database operation error" },
            { status: 500 }
        );
    }
}
