import connectToDb from "@/app/lib/db/mongoose";
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

interface RequestBody {
    email: string;
    password: string;
}

export async function POST(request: Request) {
    const body = await request.json();

    const requestBody: RequestBody = body as RequestBody; // Assert the body type

    const bodystring = JSON.stringify(requestBody);
    console.log(`Posted data stringified is: ${bodystring}`);
    console.log(`Posted data regular is: ${body}`);
    console.log(`email: ${requestBody.email}`)

    return NextResponse.json({ data: requestBody }, { status: 200 });
}
