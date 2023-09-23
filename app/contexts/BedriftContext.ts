import React, { createContext } from "react";

export const BedriftContext = createContext<{
  // Definerer typene til hver av disse
  stepper: number;
  setStepper: React.Dispatch<React.SetStateAction<number>>;
  companyName: string;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
  contactPerson: string;
  setContactPerson: React.Dispatch<React.SetStateAction<string>>;
  privateAgreement: boolean;
  setPrivateAgreement: React.Dispatch<React.SetStateAction<boolean>>;
  privateAgreementType: string;
  setPrivateAgreementType: React.Dispatch<React.SetStateAction<string>>;
  companyAgreement: boolean;
  setCompanyAgreement: React.Dispatch<React.SetStateAction<boolean>>;
  companyAgreementType: string;
  setCompanyAgreementType: React.Dispatch<React.SetStateAction<string>>;
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
});

export default BedriftContext;
