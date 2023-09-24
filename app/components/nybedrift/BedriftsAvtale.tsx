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
            {companyAgreementType === "List" && <AddList />}
            <div className="mb-6"></div>

            {/* Render parkeringsplasser og antallparkeringer komponentene. Ikke ferdig enda*/}
            <ParkingPlaces />
            <div className="mb-6"></div>
            <AntallParkeringer />
          </>
        ) : (
          <p> Ingen bedriftsavtale valgt. Du kan gå videre til neste steg</p>
        )}
        <div className="mb-6"></div>
      </div>
    </>
  );
};

// LISTE KOMPONENT
const AddList = () => {
  return (
    <>
      <p>Her legges inn liste komponent</p>
    </>
  );
};

const ParkingPlaces = () => {
  return (
    <>
      <label
        htmlFor="default-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Velg parkeringsplasser
      </label>
      <input
        type="text"
        placeholder="P1, P2..."
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </>
  );
};

const AntallParkeringer = () => {
  return (
    <>
      <label
        htmlFor="default-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Antall parkeringsplasser
      </label>
      <input
        type="number"
        placeholder="1-100"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </>
  );
};

export default BedriftsAvtale;
