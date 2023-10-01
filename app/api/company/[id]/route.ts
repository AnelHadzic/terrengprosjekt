import connectToDb from "@/app/lib/db/mongoose";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { findCompany } from "@/app/lib/model/company";

export async function GET(context: { params: any }) {
    await connectToDb();
    const companyId = context.params.id;

    if (!mongoose.isValidObjectId(companyId)) {
        return NextResponse.json(
            { data: "Invalid id format. Must be must be a string of 12 bytes or a string of 24 hex characters or a number." },
            { status: 400 }
        );
    }

    const company = await findCompany(companyId);

    if (company === null) {
        return NextResponse.json(
            { data: `No company found with id ${companyId}` },
            { status: 404 }
        );
    }

    return NextResponse.json({ data: company }, { status: 200 });
}
