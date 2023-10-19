import { useNewCompanyContext } from "@/app/contexts/NewCompanyContext"

const BedriftStepper = () => {
  const { stepper, setStepper } = useNewCompanyContext()

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
          Bekreftelse
        </li>
      </ol>
    </>
  )
}

export default BedriftStepper
