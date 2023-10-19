import { useOnboardingContext } from "@/app/contexts/OnboardingProvider"
import React from "react"

const Bilregnummere = () => {
  const { regNumbers, addInput, removeInput, addNewInput } =
    useOnboardingContext()
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="regNumbers"
          className="block text-sm font-medium text-gray-700"
        >
          Registreringsnummer
        </label>
        {regNumbers.map((regnr, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-row ...">
              <input
                type="text"
                placeholder="AE12345"
                value={regnr}
                onChange={(e) => addInput(index, e.target.value)}
                className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
              />
              <div className="mr-6"></div>
              {index > 0 ? (
                <svg
                  className="w-6 h-6 text-red-500 dark:text-white hover:text-red-800 cursor-pointer ..."
                  onClick={() => removeInput(index)}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                  />
                </svg>
              ) : (
                <div className="group relative flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className=""
                  >
                    <g fill="none">
                      <path
                        fill="yellow"
                        d="m12 2l3.104 6.728l7.358.873l-5.44 5.03l1.444 7.268L12 18.28L5.534 21.9l1.444-7.268L1.538 9.6l7.359-.873L12 2Z"
                        opacity=".16"
                      />
                      <path
                        stroke="yellow"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m12 2l3.104 6.728l7.358.873l-5.44 5.03l1.444 7.268L12 18.28L5.534 21.9l1.444-7.268L1.538 9.6l7.359-.873L12 2Z"
                      />
                    </g>
                  </svg>
                  <div className="hidden group-hover:block bg-yellow-400 text-white text-xs p-1 rounded-md ml-2">
                    Primærbil
                  </div>
                </div>
              )}
            </div>
            <div className="mb-6"></div>
          </React.Fragment>
        ))}
        <div className="flex flex-row-reverse ...">
          <button
            type="button"
            onClick={addNewInput}
            className="py-2.5 flex px-4 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <div className="">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  )
}

export default Bilregnummere
