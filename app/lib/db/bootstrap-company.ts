import { ICompany } from "./../interface/ICompany";

export const systemCompanies = () => {
    const companies = [
        {
            companyName: "Høgskolen i Østfold",
            contactEmail: "mariusca@hiof.no",
            privateAgreement: {
                domains: ["hiof.no"],
                parkingSpots: ["P1", "P4"],
                numberOfParkingSpots: 10,
            },
            companyAgreement: {
                emails: ["mariusca@hiof.no", "anelh@hiof.no"],
                parkingSpots: ["P1", "P3"],
            },
            internalComment: "Studenter har private avtaler. Ansatte har bedriftsavtale."
        },
        {
            companyName: "Fredrikstad Kommune",
            contactEmail: "sjef@fredrikstadkommune.no",
            privateAgreement: {
                emails: ["bob@fredrikstadkommune.no", "ole@fredrikstadkommune.no"],
                parkingSpots: ["P1", "P4"],
            },
            companyAgreement: {
                emails: ["lars@fredrikstadkommune.no", "petter@fredrikstadkommune.no"],
                parkingSpots: ["P1", "P3"],
            },
            internalComment: "Ikke alle skal ha mulighet til å leie fra oss, dermed kun whitelist."
        },
    ] as ICompany[];

    return companies;
};
