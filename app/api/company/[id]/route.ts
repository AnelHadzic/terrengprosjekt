import connectToDb from "@/app/lib/db/mongoose";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { deleteCompany, editCompany, findCompany } from "@/app/lib/model/company";

export async function GET(request: Request, context: { params: any }) {
    await connectToDb();
    const companyId = context.params.id;

    if (!mongoose.isValidObjectId(companyId)) {
        return NextResponse.json(
            {
                data: "Invalid id format. Must be must be a string of 12 bytes or a string of 24 hex characters or a number.",
            },
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

export async function PATCH(request: Request, context: { params: any }) {
    await connectToDb();
    const body = await request.json();

    const companyId = context.params.id;

    if (!mongoose.isValidObjectId(companyId)) {
        return NextResponse.json(
            {
                data: "Invalid id format. Must be must be a string of 12 bytes or a string of 24 hex characters or a number.",
            },
            { status: 400 }
        );
    }

    try {
        await editCompany(companyId, body);
        return NextResponse.json({ data: body }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to edit company in db. Error: " + error },
            { status: 400 }
        );
    }
}

export async function DELETE(request: Request, context: { params: any }) {
    await connectToDb();

    const companyId = context.params.id;

    if (!mongoose.isValidObjectId(companyId)) {
        return NextResponse.json(
            {
                data: "Invalid id format. Must be must be a string of 12 bytes or a string of 24 hex characters or a number.",
            },
            { status: 400 }
        );
    }

    try {
        const deletedCompany = await deleteCompany(companyId);
        return NextResponse.json({ data: deletedCompany }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to edit company in db. Error: " + error },
            { status: 400 }
        );
    }
}
