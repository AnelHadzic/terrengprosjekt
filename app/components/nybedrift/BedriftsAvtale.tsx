import React, { useContext } from "react";
import BedriftContext from "@/app/contexts/BedriftContext";
import DomeneComponent from "./DomeneComponent";
import BedriftListComponent from "./BedriftListComponent";
import ComapnyParking from "../parkering/ComapnyParking";

const BedriftsAvtale = () => {
  const { companyAgreement, companyAgreementType } = useContext(BedriftContext);

  return (
    <>
      <div className="max-w-sm p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <label
          htmlFor="checkbox"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Skal denne bedriften ha en bedriftsavtale?
        </label>
        <Avtale />
      </div>

      {companyAgreement ? (
        <>
          <div className="max-w-sm p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <label
              htmlFor="checkbox"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Skal privatavtalen bruke en whitelist av e-poster eller en liste
              med godkjente domener?
            </label>
            <AgreementType />
          </div>

          {/* Dersom agreementType er Domene, render domene Component */}
          {companyAgreementType === "Domain" && (
            <DomeneComponent header="Bedriftsavtale detaljer" />
          )}

          {/* Dersom agreementType er List, render liste Component */}
          {companyAgreementType === "Whitelist" && (
            <BedriftListComponent header="Bedriftsavtale detaljer" />
          )}
          <div className="mb-6"></div>

          {/* Render parkeringsplasser og antallparkeringer komponentene. Ikke ferdig enda*/}
          <div className="mb-6"></div>
        </>
      ) : null}

      <ComapnyParking />
    </>
  );
};

const AgreementType = () => {
  const handleAgreementTypeRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompanyAgreementType(event.target.value);
  };

  const { companyAgreementType, setCompanyAgreementType } =
    useContext(BedriftContext);
  return (
    <>
      <div className="flex items-center mb-4">
        <input
          id="agreement-radio1"
          type="radio"
          value="Whitelist"
          name="agreement-radio"
          checked={companyAgreementType === "Whitelist"}
          onChange={handleAgreementTypeRadioChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="agreement-radio1"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Whitelist
        </label>
      </div>
      <div className="flex items-center">
        <input
          id="agreement-radio2"
          type="radio"
          value="Domain"
          name="agreement-radio"
          onChange={handleAgreementTypeRadioChange}
          checked={companyAgreementType === "Domain"}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="agreement-radio2"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Domener
        </label>
      </div>
    </>
  );
};

const Avtale = () => {
  const handleCompanyRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompanyAgreement(event.target.value === "True");
  };

  const { companyAgreement, setCompanyAgreement } = useContext(BedriftContext);
  return (
    <>
      <div className="flex items-center mb-4">
        <input
          id="bedrift-radio1"
          type="radio"
          value="True"
          name="bedrift-radio"
          checked={companyAgreement === true}
          onChange={handleCompanyRadioChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="bedrift-radio1"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Ja
        </label>
      </div>
      <div className="flex items-center">
        <input
          id="bedrift-radio2"
          type="radio"
          value="False"
          name="bedrift-radio"
          onChange={handleCompanyRadioChange}
          checked={companyAgreement === false}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="bedrift-radio2"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Nei
        </label>
      </div>
    </>
  );
};

export default BedriftsAvtale;
