import React, { useContext } from "react";
import BedriftContext from "@/app/contexts/BedriftContext";
import DomeneComponent from "./DomeneComponent";
import BedriftListComponent from "./BedriftListComponent";
import PrivateListComponent from "./PrivateListComponent";
import ComapnyParking from "../parkering/ComapnyParking";

const PrivatAvtale = () => {
  const { privateAgreement, privateAgreementType } = useContext(BedriftContext);

  return (
    <>
      <div className="max-w-sm p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <label
          htmlFor="checkbox"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Skal denne bedriften ha privatavtaler?
        </label>
        <Avtale />
      </div>

      {privateAgreement ? (
        <>
          <div className="max-w-sm p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <label
              htmlFor="checkbox"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Skal privatavtalene bruke en whitelist av e-poster eller en liste
              med godkjente domener?
            </label>
            <AgreementType />
          </div>

          {/* Dersom agreementType er Domene, render domene Component */}
          {privateAgreementType === "Domain" && (
            <DomeneComponent header="Privavtale detaljer" />
          )}

          {/* Dersom agreementType er List, render liste Component */}
          {privateAgreementType === "Whitelist" && (
            <PrivateListComponent header="Privavtale detaljer" />
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
    setPrivateAgreementType(event.target.value);
  };

  const { privateAgreementType, setPrivateAgreementType } =
    useContext(BedriftContext);
  return (
    <>
      <div className="flex items-center mb-4">
        <input
          id="agreement-radio1"
          type="radio"
          value="Whitelist"
          name="agreement-radio"
          checked={privateAgreementType === "Whitelist"}
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
          checked={privateAgreementType === "Domain"}
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
    setPrivateAgreement(event.target.value === "True");
  };

  const { privateAgreement, setPrivateAgreement } = useContext(BedriftContext);
  return (
    <>
      <div className="flex items-center mb-4">
        <input
          id="private-radio1"
          type="radio"
          value="True"
          name="private-radio"
          checked={privateAgreement === true}
          onChange={handleCompanyRadioChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="private-radio1"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Ja
        </label>
      </div>
      <div className="flex items-center">
        <input
          id="private-radio2"
          type="radio"
          value="False"
          name="private-radio"
          onChange={handleCompanyRadioChange}
          checked={privateAgreement === false}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="private-radio2"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Nei
        </label>
      </div>
    </>
  );
};

export default PrivatAvtale;
