"use client";
import BedriftInfo from "@/app/components/nybedrift/BedriftInfo";
import React, { useState } from "react";

// type Stepper = {
//     stepper: Number,
//     setStepper: Number
// }

const page = () => {
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
      <main className="flex min-h-screen flex-col items-center">
        <StepperComponent stepper={stepper} setStepper={setStepper} />
        {stepper === 1 ? <BedriftInfo /> : null}
        {stepper === 2 ? "2" : null}
        {stepper === 3 ? "3" : null}
        {stepper === 4 ? "4" : null}
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
    </>
  );
};

const StepperComponent = ({ stepper, setStepper }) => {
  return (
    <>
      <ol className="flex justify-center items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
        <li
          className={`flex items-center ${
            stepper === 1 ? "text-blue-600 font-bold" : "text-gray-500"
          } cursor-pointer ...:`}
          onClick={() => setStepper(1)}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${
              stepper === 1 ? "border-blue-600" : "border-gray-500"
            } rounded-full shrink-0 dark:border-gray-400`}
          >
            1
          </span>
          Bedrifts <span className="hidden sm:inline-flex sm:ml-2">Info</span>
          <svg
            className="w-3 h-3 ml-2 sm:ml-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={`flex items-center ${
            stepper === 2 ? "text-blue-600 font-bold" : "text-gray-500"
          } cursor-pointer ...:`}
          onClick={() => setStepper(2)}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${
              stepper === 2 ? "border-blue-600" : "border-gray-500"
            } rounded-full shrink-0 dark:border-gray-400`}
          >
            2
          </span>
          Velg <span className="hidden sm:inline-flex sm:ml-2">Avtale</span>
          <svg
            className="w-3 h-3 ml-2 sm:ml-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={`flex items-center ${
            stepper === 3 ? "text-blue-600 font-bold" : "text-gray-500"
          } cursor-pointer ...:`}
          onClick={() => setStepper(3)}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${
              stepper === 3 ? "border-blue-600" : "border-gray-500"
            } rounded-full shrink-0 dark:border-gray-400`}
          >
            3
          </span>
          Privat <span className="hidden sm:inline-flex sm:ml-2">Avtale</span>
          <svg
            className="w-3 h-3 ml-2 sm:ml-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={`flex items-center ${
            stepper === 4 ? "text-blue-600 font-bold" : "text-gray-500"
          } cursor-pointer ...:`}
          onClick={() => setStepper(4)}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${
              stepper === 4 ? "border-blue-600" : "border-gray-500"
            } rounded-full shrink-0 dark:border-gray-400`}
          >
            4
          </span>
          Bedrifts <span className="hidden sm:inline-flex sm:ml-2">Avtale</span>
          <svg
            className="w-3 h-3 ml-2 sm:ml-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={`flex items-center ${
            stepper === 5 ? "text-blue-600 font-bold" : "text-gray-500"
          } cursor-pointer ...:`}
          onClick={() => setStepper(5)}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${
              stepper === 5 ? "border-blue-600" : "border-gray-500"
            } rounded-full shrink-0 dark:border-gray-400`}
          >
            5
          </span>
          Bekreftelse
        </li>
      </ol>
    </>
  );
};

export default page;
