import { IAgreement } from './../interface/IAgreement';
import mongoose, { Schema } from "mongoose";
import { ICompany } from "../interface/ICompany";

const agreementSchema = new Schema<IAgreement>({
    domains: [String],
    emails: [String],
    parkingSpots: [String],
    numberOfParkingSpots: Number,
});

const companySchema = new Schema({
    companyName: {
        type: String,
        unique: true,
    },
    contactEmail: String,
    privateAgreement: agreementSchema,
    companyAgreement: agreementSchema,
    created: { type: Date, default: Date.now },
});

export const Company = mongoose.model<ICompany>("Company", companySchema);

export async function findCompany(companyName: string | null) {
    const session = await Company.findOne({ companyName: { $eq: companyName } });

    if (session) {
        return session;
    }

    return null;
}

export async function createCompany(company: ICompany) {
    const newEntry = new Company(company);
    await newEntry.save();
}
