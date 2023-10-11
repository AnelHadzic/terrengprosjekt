import axios from "axios";
import { ICompany } from "@/app/lib/interface/ICompany";
import { Fragment, useEffect, useState } from "react";

export default function SingleCompany({ companyId }: { companyId: string }) {
  const [company, setCompany] = useState<ICompany>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = `http://localhost:3000/api/company/${companyId}`;
        const response = await axios.get(API_URL);
        console.log(response.data.data);

        setCompany(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [companyId]);

  const handleEditClick = (company: ICompany | undefined) => {};

  return (
    <div className="w-full p-6 mt-6 pb-12 flex">
      {/* Details */}
      <div className="w-2/5 pl-14 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex mb-6 items-center justify-between">
          <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            {company?.companyName}
          </h1>
          <button
            onClick={() => handleEditClick(company)}
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Endre
          </button>
        </div>

        <h2 className="text-l font-bold leading-none text-gray-900 dark:text-white">
          Kontaktperson
        </h2>
        <p className="mb-6">{company?.contactEmail}</p>

        {company?.companyAgreement ? (
          <>
            <h2 className="text-l font-bold leading-none text-gray-900 dark:text-white">
              Bedriftsavtale
            </h2>
            {Array.isArray(company.companyAgreement.domains) &&
            company.companyAgreement.domains.length > 0 ? (
              <div className="mb-6">
                <p>Domener:</p>
                {company.companyAgreement.domains.map((item, index) => (
                  <Fragment key={index}>
                    <p>{item}</p>
                  </Fragment>
                ))}
              </div>
            ) : null}
            {Array.isArray(company.companyAgreement.emails) &&
            company.companyAgreement.emails.length > 0 ? (
              <div className="mb-6">
                <p>e-poster:</p>
                {company.companyAgreement.emails.map((item, index) => (
                  <Fragment key={index}>
                    <p>{item}</p>
                  </Fragment>
                ))}
              </div>
            ) : null}
            <div className="mb-6"></div>
          </>
        ) : null}

        {company?.privateAgreement ? (
          <>
            <h2 className="text-l font-bold leading-none text-gray-900 dark:text-white">
              Privat avtale
            </h2>
            {Array.isArray(company.privateAgreement.domains) &&
            company.privateAgreement.domains.length > 0 ? (
              <div className="mb-6">
                <p>Domener:</p>
                {company.privateAgreement.domains.map((item, index) => (
                  <Fragment key={index}>
                    <p>{item}</p>
                  </Fragment>
                ))}
              </div>
            ) : null}
            {Array.isArray(company.privateAgreement.emails) &&
            company.privateAgreement.emails.length > 0 ? (
              <div className="mb-6">
                <p>e-poster:</p>
                {company.privateAgreement.emails.map((item, index) => (
                  <Fragment key={index}>
                    <p>{item}</p>
                  </Fragment>
                ))}
              </div>
            ) : null}
          </>
        ) : null}

        <div className="flex items-center justify-between">
          <h2 className="text-l font-bold leading-none text-gray-900 dark:text-white">
            Antall brukere
          </h2>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Se alle
          </a>
        </div>
        <p className="mb-6">85</p>
      </div>

      {/* History */}
      <div className="w-3/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Dato
              </th>
              <th scope="col" className="px-6 py-3">
                Hendelse
              </th>
              <th scope="col" className="px-6 py-3">
                Utført av
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                06.10.2023
              </th>
              <td className="px-6 py-4">Endret kontaktperson.</td>
              <td className="px-6 py-4">mariusca@hiof.no</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                06.10.2023
              </th>
              <td className="px-6 py-4">
                Lang tekst for å forklare nøyaktig hva som skjedde med denne
                bedriften.
              </td>
              <td className="px-6 py-4">mariusca@hiof.no</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                06.10.2023
              </th>
              <td className="px-6 py-4">Bedriften ble opprettet</td>
              <td className="px-6 py-4">mariusca@hiof.no</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
