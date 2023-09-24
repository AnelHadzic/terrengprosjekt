import React, { createContext } from "react";

export const BedriftContext = createContext<{
  // Definerer typene til hver av disse

  // Hoved page stepper
  stepper: number;
  setStepper: React.Dispatch<React.SetStateAction<number>>;

  // Bedrifts Info : 1
  companyName: string;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
  contactPerson: string;
  setContactPerson: React.Dispatch<React.SetStateAction<string>>;

  // Velg Avtale : 2
  privateAgreement: boolean;
  setPrivateAgreement: React.Dispatch<React.SetStateAction<boolean>>;
  privateAgreementType: string;
  setPrivateAgreementType: React.Dispatch<React.SetStateAction<string>>;
  companyAgreement: boolean;
  setCompanyAgreement: React.Dispatch<React.SetStateAction<boolean>>;
  companyAgreementType: string;
  setCompanyAgreementType: React.Dispatch<React.SetStateAction<string>>;

  // Privat Avtale : 3
  privateWhitelist: string[]
  setPrivateWhitelist: React.Dispatch<React.SetStateAction<string[]>>;


  // Bedrifts Avtale : 4
  domains: string[];
  setDomains: React.Dispatch<React.SetStateAction<string[]>>;
  companyWhitelist: string[]
  setCompanyWhitelist: React.Dispatch<React.SetStateAction<string[]>>;

}>({
  // Setter forventet default value
  stepper: 0,
  setStepper: () => {},
  companyName: "",
  setCompanyName: () => {},
  contactPerson: "",
  setContactPerson: () => {},
  privateAgreement: false,
  setPrivateAgreement: () => {},
  privateAgreementType: "",
  setPrivateAgreementType: () => {},
  companyAgreement: false,
  setCompanyAgreement: () => {},
  companyAgreementType: "",
  setCompanyAgreementType: () => {},
  domains: [""],
  setDomains: () => {},
  privateWhitelist: [""],
  setPrivateWhitelist: () => {},
  companyWhitelist: [""],
  setCompanyWhitelist: () => {},
});

export default BedriftContext;
