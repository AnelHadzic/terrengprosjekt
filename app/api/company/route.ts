import connectToDb from "@/app/lib/db/mongoose";
import {
    findAllCompanies,
    findCompaniesByName,
    findCompany,
} from "@/app/lib/model/company";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: any }) {
    await connectToDb();
    const searchParams = request.nextUrl.searchParams;
    const companyName = searchParams.get("companyName");
    if (companyName != null) {
        const companies = await findCompaniesByName(companyName);
        if (companies === null) {
            return NextResponse.json(
                { data: "Database operation error" },
                { status: 500 }
            );
        }
        return NextResponse.json({ data: companies }, { status: 200 });
    } else {
        const companies = await findAllCompanies();
        if (companies === null) {
            return NextResponse.json(
                { data: "Database operation error" },
                { status: 500 }
            );
        }
        return NextResponse.json({ data: companies }, { status: 200 });
    }
}
