"use client";
import BedriftInfo from "@/app/components/nybedrift/BedriftInfo";
import BedriftOppsummering from "@/app/components/nybedrift/BedriftOppsummering";
import BedriftStepper from "@/app/components/nybedrift/BedriftStepper";
import React, { useState } from "react";
import BedriftContext from "@/app/contexts/BedriftContext";
import Avtale from "@/app/components/nybedrift/Avtale";
import BedriftsAvtale from "@/app/components/nybedrift/BedriftsAvtale";
import PrivatAvtale from "@/app/components/nybedrift/PrivatAvtale";

const Page = () => {
  // Stepper State
  const [stepper, setStepper] = useState<number>(1);

  // BEDRIFTS DETALJER SOM SKAL SENDES

  // SIDE 1
  const [companyName, setCompanyName] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");

  // SIDE2
  const [privateAgreement, setPrivateAgreement] = useState<boolean>(false);
  const [companyAgreement, setCompanyAgreement] = useState<boolean>(false);
  const [privateAgreementType, setPrivateAgreementType] = useState<string>("");
  const [companyAgreementType, setCompanyAgreementType] = useState<string>("");

  // SIDE 3
  const [whitelist, setWhitelist] = useState<string[]>([""]);


  // SIDE 4
  const [domains, setDomains] = useState<string[]>([""]);

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
          privateAgreementType,
          setPrivateAgreementType,
          companyAgreement,
          setCompanyAgreement,
          companyAgreementType,
          setCompanyAgreementType,
          domains,
          setDomains,
          whitelist,
          setWhitelist,
        }}
      >
        <main className="flex min-h-screen flex-col items-center">
          <BedriftStepper />
          {stepper === 1 ? <BedriftInfo /> : null}
          {stepper === 2 ? <Avtale /> : null}
          {stepper === 3 ? <PrivatAvtale /> : null}
          {stepper === 4 ? <BedriftsAvtale /> : null}
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

export default Page;
