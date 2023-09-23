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
  comapnyAgreement: boolean;
  setCompanyAgreement: React.Dispatch<React.SetStateAction<boolean>>;
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
  comapnyAgreement: false,
  setCompanyAgreement: () => {},
});

export default BedriftContext;
