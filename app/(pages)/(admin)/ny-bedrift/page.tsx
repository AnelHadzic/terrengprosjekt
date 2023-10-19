"use client"
import BedriftInfo from "@/app/components/nybedrift/BedriftInfo"
import BedriftOppsummering from "@/app/components/nybedrift/BedriftOppsummering"
import BedriftStepper from "@/app/components/nybedrift/BedriftStepper"

import BedriftsAvtale from "@/app/components/nybedrift/BedriftsAvtale"
import PrivatAvtale from "@/app/components/nybedrift/PrivatAvtale"
import {
  NewCompanyProvider,
  useNewCompanyContext,
} from "@/app/contexts/NewCompanyContext"

const Page = () => {
  return (
    <NewCompanyProvider>
      <main className="flex min-h-screen flex-col items-center">
        <BedriftStepper />
        <Bedriftscontent />
      </main>
    </NewCompanyProvider>
  )
}

const Bedriftscontent = () => {
  const {
    stepper,
    incrementStepper,
    decrementStepper,
    handleSubmit,
    error,
    status,
  } = useNewCompanyContext()

  return (
    <>
      {stepper === 1 && <BedriftInfo />}
      {stepper === 2 && <BedriftsAvtale />}
      {stepper === 3 && <PrivatAvtale />}
      {stepper === 4 && <BedriftOppsummering />}
      <div className="flex">
        {stepper > 1 ? (
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 mt-6 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={decrementStepper}
          >
            Tilbake
          </button>
        ) : null}

        {stepper < 4 ? (
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 mt-6 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={incrementStepper}
          >
            Neste
          </button>
        ) : (
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 mt-6 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Opprette bedrift
          </button>
        )}
      </div>
      {status ?? status}
      {error ?? error}
    </>
  )
}

export default Page
