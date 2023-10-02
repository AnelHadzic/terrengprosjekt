import { createCompany } from "./../../lib/model/company";
import connectToDb from "@/app/lib/db/mongoose";
import { ICompany } from "@/app/lib/interface/ICompany";
import { findAllCompanies, findCompaniesByName } from "@/app/lib/model/company";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ nextUrl }: NextRequest) {
    await connectToDb();
    const companyName = nextUrl?.searchParams?.get("companyName");
    const companies = companyName
        ? await findCompaniesByName(companyName)
        : await findAllCompanies();

    if (companies === null) {
        return NextResponse.json(
            { data: "Database operation error" },
            { status: 500 }
        );
    }

    return NextResponse.json({ data: companies }, { status: 200 });
}

export async function POST(request: Request) {
    await connectToDb();
    const body = await request.json();

    const company: ICompany = body as ICompany;

    try {
        await createCompany(company);
        return NextResponse.json({ data: company }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create company in db. Error: " + error },
            { status: 400 }
        );
    }

    // Useful for troubleshooting
    // const bodystring = JSON.stringify(company);
    // console.log(`Posted data stringified is: ${bodystring}`);
    // console.log(`Posted data regular is: ${body}`);
    // console.log(`Company name: ${company.companyName}`)
}
