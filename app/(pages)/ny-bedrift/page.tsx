"use client";
import BedriftInfo from "@/app/components/nybedrift/BedriftInfo";
import React, { useState } from "react";

// type Stepper = {
//     stepper: Number,
//     setStepper: Number
// }

const page = () => {
  const [stepper, setStepper] = useState<Number>(1);
  const activeStepper = "blue-600";
  return (
    <>
      <StepperComponent stepper={stepper} setStepper={setStepper} />
      {stepper === 1 ? <BedriftInfo /> : null}
      {stepper === 2 ? "2" : null}
      {stepper === 3 ? "3" : null}
      {stepper === 4 ? "4" : null}
    </>
  );
};

const StepperComponent = ({ stepper, setStepper }) => {
  return (
    <>
      <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
        <li
          className={`flex items-center text-${
            stepper === 1 ? "blue-600 font-bold" : "gray-500"
          } cursor-pointer ...:`}
          onClick={() => setStepper(1)}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border border-${
              stepper === 1 ? "blue-600" : "gray-500"
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={`flex items-center text-${
            stepper === 2 ? "blue-600 font-bold" : "gray-500"
          } cursor-pointer ...:`}
          onClick={() => setStepper(2)}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border border-${
              stepper === 2 ? "blue-600" : "gray-500"
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={`flex items-center text-${
            stepper === 3 ? "blue-600 font-bold" : "gray-500"
          } cursor-pointer ...:`}
          onClick={() => setStepper(3)}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border border-${
              stepper === 3 ? "blue-600" : "gray-500"
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={`flex items-center text-${
            stepper === 4 ? "blue-600 font-bold" : "gray-500"
          } cursor-pointer ...:`}
          onClick={() => setStepper(4)}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border border-${
              stepper === 4 ? "blue-600" : "gray-500"
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={`flex items-center text-${
            stepper === 5 ? "blue-600 font-bold" : "gray-500"
          } cursor-pointer ...:`}
          onClick={() => setStepper(5)}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border border-${
              stepper === 5 ? "blue-600" : "gray-500"
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
