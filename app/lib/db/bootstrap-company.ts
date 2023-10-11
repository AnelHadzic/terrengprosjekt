import { ICompany } from "./../interface/ICompany";

export const systemCompanies = () => {
  const companies = [
    {
      companyName: "Høgskolen i Østfold",
      contactEmail: "mariusca@hiof.no",
      privateAgreement: {
        domains: ["hiof.no"],
        parkingSpots: [
          {
            parkingName: "P4",
            parkingLimit: 85,
          },
          {
            parkingName: "P1",
            parkingLimit: 60,
          },
        ],
      },
      companyAgreement: {
        emails: ["mariusca@hiof.no", "anelh@hiof.no"],
        parkingSpots: [
            {
              parkingName: "P4",
              parkingLimit: 20,
            },
          ],
      },
      internalComment:
        "Studenter har private avtaler. Ansatte har bedriftsavtale.",
    },
    {
      companyName: "Fredrikstad Kommune",
      contactEmail: "sjef@fredrikstadkommune.no",
      privateAgreement: {
        emails: ["bob@fredrikstadkommune.no", "ole@fredrikstadkommune.no"],
        parkingSpots: [
          {
            parkingName: "P5",
            parkingLimit: 20,
          },
        ],
      },
      companyAgreement: {
        emails: ["lars@fredrikstadkommune.no", "petter@fredrikstadkommune.no"],
        parkingSpots: [
          {
            parkingName: "P4",
            parkingLimit: 30,
          },
        ],
      },
      internalComment:
        "Ikke alle skal ha mulighet til å leie, dermed kun whitelist.",
    },
  ] as ICompany[];

  return companies;
};
