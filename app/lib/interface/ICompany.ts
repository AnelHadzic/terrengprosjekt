import { IAgreement } from "./IAgreement";

export interface ICompany {
    companyName: string;
    contactEmail?: string;
    privateAgreement?: IAgreement;
    companyAgreement?: IAgreement;
    created?: Date;
}
