"use client"
import React from "react"
import Bilregnummere from "@/app/components/Onboarding/Bilregnummere"
import OnboardingStepper from "@/app/components/Onboarding/OnboardingStepper"
import Oppsummering from "@/app/components/Onboarding/Oppsummering"
import PersonligInfo from "@/app/components/Onboarding/PersonligInfo"
import {
  OnboardingProvider,
  useOnboardingContext,
} from "@/app/contexts/OnboardingProvider"

const Page = () => {
  return (
    <OnboardingProvider>
      <main className="flex flex-col items-center min-h-screen p-4 sm:p-8">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <OnboardingStepper />
          <div className="mb-6"></div>
          <h2 className="text-xl">Fullfør registreringen </h2>
          <div className="mb-6"></div>
          <OnboardingContent />
        </div>
      </main>
    </OnboardingProvider>
  )
}

const OnboardingContent = () => {
  const {
    stepper,
    incrementStepper,
    decrementStepper,
    handleUpdateUser,
    regNumbers,
  } = useOnboardingContext()

  return (
    <>
      {stepper === 1 && <PersonligInfo />}
      {stepper === 2 && <Bilregnummere />}
      {stepper === 3 && <Oppsummering />}
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

        {stepper < 3 ? (
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 mt-6 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={incrementStepper}
          >
            Neste
          </button>
        ) : (
          <button
            disabled={
              regNumbers.length === 0 ||
              (regNumbers.length === 1 && regNumbers[0] === "")
            }
            onClick={handleUpdateUser}
            type="button"
            className={`text-white ${
              regNumbers.length === 0 ||
              (regNumbers.length === 1 && regNumbers[0] === "")
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            } mt-6 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
          >
            Lagre
          </button>
        )}
      </div>
    </>
  )
}

export default Page
