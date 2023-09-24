import React, { useContext } from "react";
import BedriftContext from "@/app/contexts/BedriftContext";
import DomeneComponent from "./DomeneComponent";

const BedriftsAvtale = () => {
  const { companyAgreement, companyAgreementType } = useContext(BedriftContext);

  return (
    <>
      <div
        className="max-w-sm p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        style={{ minWidth: "500px" }}
      >
        {/* // Dersom companyAgreement er valgt i Velg Avtale... */}
        {companyAgreement ? (
          <>
            {/* Dersom agreementType er Domene, render domene Component */}
            {companyAgreementType === "Domain" && <DomeneComponent />}

            {/* Dersom agreementType er List, render liste Component */}
            {/* {companyAgreementType === "List" && <AddList />} */}
            <div className="mb-6"></div>

            {/* Render parkeringsplasser og antallparkeringer komponentene. Ikke ferdig enda*/}
          </>
        ) : (
          <p> Ingen bedriftsavtale valgt. Du kan gå videre til neste steg</p>
        )}
        <div className="mb-6"></div>
      </div>
    </>
  );
};

export default BedriftsAvtale;
