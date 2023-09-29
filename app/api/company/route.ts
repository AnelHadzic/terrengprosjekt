import connectToDb from "@/app/lib/db/mongoose";
import { findAllCompanies } from "@/app/lib/model/company";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDb();
    const companies = await findAllCompanies();
    if (companies === null) {
        return NextResponse.json(
            { data: "Database operation error" },
            { status: 500 }
        );
    }
    return NextResponse.json(
        { data: companies },
        { status: 200 }
    );
}
