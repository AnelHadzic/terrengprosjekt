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
    {
      companyName: "Bemanning AS",
      contactEmail: "boss@bemanning.no",
      privateAgreement: {
        emails: ["extBob@bemanning.no", "extknut@bemanning.no"],
        parkingSpots: [
          {
            parkingName: "P8",
            parkingLimit: 20,
          },
        ],
      },
      companyAgreement: {
        domains: ["bemanning.no"],
        parkingSpots: [
          {
            parkingName: "P12",
            parkingLimit: 30,
          },
        ],
      },
      internalComment:
        "Bedriften har innleide/eksterne som må lage privatavtale.",
    }
  ] as ICompany[];

  return companies;
};
