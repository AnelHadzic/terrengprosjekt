import { IAgreement } from "./IAgreement";

export interface ICompany {
    _id?: string
    companyName: string;
    contactEmail?: string;
    privateAgreement?: IAgreement;
    companyAgreement?: IAgreement;
    internalComment?: string;
    created?: Date;
}
