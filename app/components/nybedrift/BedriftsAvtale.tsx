import React, { useContext } from "react";
import BedriftContext from "@/app/contexts/BedriftContext";
import DomeneComponent from "./DomeneComponent";
import BedriftListComponent from "./BedriftListComponent";

const BedriftsAvtale = () => {
  const { companyAgreement, companyAgreementType } = useContext(BedriftContext);

  return (
    <>
        {/* // Dersom companyAgreement er valgt i Velg Avtale... */}
        {companyAgreement ? (
          <>
            {/* Dersom agreementType er Domene, render domene Component */}
            {companyAgreementType === "Domain" && <DomeneComponent header="Bedriftsavtale detaljer" />}

            {/* Dersom agreementType er List, render liste Component */}
            {companyAgreementType === "List" && <BedriftListComponent header="Bedriftsavtale detaljer" />}
            <div className="mb-6"></div>

            {/* Render parkeringsplasser og antallparkeringer komponentene. Ikke ferdig enda*/}
          </>
        ) : (
          <p> Ingen bedriftsavtale valgt. Du kan gå videre til neste steg</p>
        )}
        <div className="mb-6"></div>
    </>
  );
};

export default BedriftsAvtale;