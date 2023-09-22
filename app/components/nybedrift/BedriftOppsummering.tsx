import React, { useContext } from "react";
import { BedriftContext } from "../../(pages)/ny-bedrift/page";

const BedriftOppsummering = () => {
  const { companyName, contactPerson } = useContext(BedriftContext);
  return (
    <>
      <div className="max-w-sm p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-2xl font-bold dark:text-white mb-6">
          Informasjon om bedriften
        </h1>

        <div className="mb-6">
          <label
            htmlFor="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Bedrift
          </label>
          <p>{companyName}</p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Kontaktperson
          </label>
          <p>{contactPerson}</p>
        </div>
      </div>
    </>
  );
};

export default BedriftOppsummering;
