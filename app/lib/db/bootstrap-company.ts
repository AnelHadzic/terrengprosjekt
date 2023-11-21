import { ICompany } from "./../interface/ICompany"

export const systemCompanies = () => {
  const companies = [
    {
      _id: "652f74492b45acf167a7940a",
      companyName: "Høgskolen i Østfold",
      contactEmail: "mariusca@hiof.no",
      companyAgreement: {
        emails: ["mariusca@hiof.no", "anelh@hiof.no"],
        parkingSpots: [
          {
            parkingName: "P2",
            parkingLimit: 20,
          },
          {
            parkingName: "P3",
            parkingLimit: 10,
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
            parkingLimit: 10,
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
    },
    {
      _id: "752f74492b45acf167a7940d",
      companyName: "Sopra Steria Fredrikstad",
      contactEmail: "jorgen.braekke@soprasteria.com",
      companyAgreement: {
        domains: ["soprasteria.com"],
        parkingSpots: [
          {
            parkingName: "P1",
            parkingLimit: 30,
          },
        ],
      },
      internalComment:
        "Bedriften har innleide/eksterne som må lage privatavtale.",
    },
  ] as ICompany[]

  return companies
}
