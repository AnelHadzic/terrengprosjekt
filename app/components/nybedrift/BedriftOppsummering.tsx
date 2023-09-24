import React, { useContext } from "react";
import BedriftContext from "@/app/contexts/BedriftContext";

const BedriftOppsummering = () => {
  const { companyAgreement, privateAgreement } = useContext(BedriftContext);
  return (
    <>
      <div className="max-w-sm p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-2xl font-bold dark:text-white mb-6">
          Oppsummering av bedriften
        </h1>
        <GeneralInfo />
        {privateAgreement ? <PrivatInfo /> : null}
        {companyAgreement ? <BedriftInfo /> : null}
      </div>
    </>
  );
};

const GeneralInfo = () => {
  const { companyName, contactPerson } = useContext(BedriftContext);
  return (
    <>
      <div className="max-w-sm p-6 mt-6 bg-white border border-gray-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-1xl font-bold dark:text-white mb-6">
          Oppsummering av bedriften
        </h1>
        <div className="mb-6">
          <span>
            Bedrift: <span>{companyName}</span>
          </span>
        </div>
        <div className="mb-6">
          <span>
            Kontaktperson: <span>{contactPerson}</span>
          </span>
        </div>
      </div>
    </>
  );
};

const PrivatInfo = () => {
  const { privateAgreementType, privateWhitelist, domains } = useContext(BedriftContext);
  return (
    <>
      <div className="max-w-sm p-6 mt-6 bg-white border border-gray-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-1xl font-bold dark:text-white mb-6">
          Privatavtale
        </h1>
        <span>
          Avtaletype: <span>{privateAgreementType}</span>
        </span>
        <div className="mb-6"></div>
        {privateAgreementType === "List" && (
          <>
            <span>
              E-poster: <span></span>
              {privateWhitelist.map((email) => email + ", ")}
            </span>
          </>
        )}
        {privateAgreementType === "Domain" && (
          <>
          <span>
            Domener: <span></span>
            {domains.map((domain) => domain + ", ")}
          </span>
        </>
        )}
      </div>
    </>
  );
};

const BedriftInfo = () => {
  const { companyAgreementType, companyWhitelist, domains } = useContext(BedriftContext);
  return (
    <>
      <div className="max-w-sm p-6 mt-6 bg-white border border-gray-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-1xl font-bold dark:text-white mb-6">
          Bedriftsavtale
        </h1>
        <span>
          Avtaletype: <span>{companyAgreementType}</span>
        </span>
        <div className="mb-6"></div>
        {companyAgreementType === "List" && (
          <>
            <span>
              E-poster: <span></span>
              {companyWhitelist.map((email) => email + ", ")}
            </span>
          </>
        )}
        {companyAgreementType === "Domain" && (
          <>
            <span>
              Domener: <span></span>
              {domains.map((domain) => domain + ", ")}
            </span>
          </>
        )}
      </div>
    </>
  );
};
export default BedriftOppsummering;
