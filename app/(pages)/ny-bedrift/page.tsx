"use client";
import BedriftInfo from "@/app/components/nybedrift/BedriftInfo";
import BedriftOppsummering from "@/app/components/nybedrift/BedriftOppsummering";
import BedriftStepper from "@/app/components/nybedrift/BedriftStepper";
import React, { useState, createContext } from "react";

// type Stepper = {
//     stepper: Number,
//     setStepper: Number
// }
export const BedriftContext = createContext<{
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
  stepper: 0, // Provide initial values here
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

const page = () => {
  // Stepper State
  const [stepper, setStepper] = useState<number>(1);

  // BEDRIFTS DETALJER SOM SKAL SENDES

  // SIDE 1
  const [companyName, setCompanyName] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");

  // SIDE2
  const [privateAgreement, setPrivateAgreement] = useState<boolean>(false);
  const [comapnyAgreement, setCompanyAgreement] = useState<boolean>(false);

  // HANDLE SUBMIT TO USE API
  return (
    <>
      <BedriftContext.Provider
        value={{
          stepper,
          setStepper,
          companyName,
          setCompanyName,
          contactPerson,
          setContactPerson,
          privateAgreement,
          setPrivateAgreement,
          comapnyAgreement,
          setCompanyAgreement,
        }}
      >
        <main className="flex min-h-screen flex-col items-center">
          <BedriftStepper />
          {stepper === 1 ? <BedriftInfo /> : null}
          {stepper === 2 ? "2" : null}
          {stepper === 3 ? "3" : null}
          {stepper === 4 ? "4" : null}
          {stepper === 5 ? <BedriftOppsummering /> : null}
          <div className="flex">
            {stepper > 1 ? (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 mt-6 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={(prev) => setStepper((prev) => prev - 1)}
              >
                Tilbake
              </button>
            ) : null}
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 mt-6 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={(prev) => setStepper((prev) => prev + 1)}
            >
              Neste
            </button>
          </div>
        </main>
      </BedriftContext.Provider>
    </>
  );
};

export default page;
