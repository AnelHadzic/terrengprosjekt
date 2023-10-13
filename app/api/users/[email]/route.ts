import connectToDb from "@/app/lib/db/mongoose";
import { deleteUser, editUser, findUser } from "@/app/lib/model/user";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: {params: {email: string}}) {
    await connectToDb();
    const email = context.params.email;

    const user = await findUser(email)

    if (user === null) {
        return NextResponse.json(
            { data: `No user found with email ${email}` },
            { status: 404 }
        );
    }

    return NextResponse.json({ data: user }, { status: 200 });
}

export async function PATCH(request: Request, context: {params: {email: string}}) {
    await connectToDb()
    const body = await request.json();

    const email = context.params.email;
    try {
        await editUser(email, body);
        return NextResponse.json({ data: body }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to edit user in db. Error: " + error },
            { status: 400 }
        );
    }
}

export async function DELETE(request: Request, context: {params: {email: string}}) {
    await connectToDb();

    const email = context.params.email;

    try {
        const deletedCompany = await deleteUser(email);
        return NextResponse.json({ data: deletedCompany }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete user in db. Error: " + error },
            { status: 400 }
        );
    }
}