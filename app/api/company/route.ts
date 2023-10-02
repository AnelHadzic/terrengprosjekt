import connectToDb from "@/app/lib/db/mongoose";
import {
    findAllCompanies,
    findCompaniesByName,
} from "@/app/lib/model/company";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ nextUrl }: NextRequest) {
    await connectToDb();
    const companyName = nextUrl?.searchParams?.get("companyName");
    const companies = companyName
      ? await findCompaniesByName(companyName)
      : await findAllCompanies();
  
    if (companies === null) {
      return NextResponse.json({ data: "Database operation error" }, { status: 500 });
    }
  
    return NextResponse.json({ data: companies }, { status: 200 });
  }
  
