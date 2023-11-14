"use client"
import { useUserDataContext } from "@/app/contexts/UserContex"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import Loading from "../shared/Loading"

const MyCars = () => {
  const { userData, getUserData } = useUserDataContext()

  const regNumbers = userData?.carRegNumbers

  const router = useRouter()

  const handleButtonClick = async (regnr: string) => {
    await updatePrimaryCar(regnr)
    getUserData()
    router.push(`/`)
  }

  const updatePrimaryCar = async (primaryCar: string): Promise<void> => {
    const payload = {
      primaryCarRegNumber: primaryCar,
    }

    console.log(payload)

    await fetch(`/api/users/${userData?.email}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error(error)
      })
  }
  if (!regNumbers) {
    return <Loading />
  } else
    return (
      <>
        {regNumbers?.map((regnr, index) => (
          <React.Fragment key={index}>
            <div className="mb-3 w-full">
              <button
                onClick={() => {
                  handleButtonClick(regnr)
                }}
                type="button"
                className={
                  regnr === userData?.primaryCarRegNumber
                    ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
                    : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-full"
                }
              >
                <div className="flex flex-row items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 512 512"
                    className="mr-6"
                  >
                    <path
                      fill="currentColor"
                      d="M447.68 220.78a16 16 0 0 0-1-3.08l-37.78-88.16C400.19 109.17 379 96 354.89 96H157.11c-24.09 0-45.3 13.17-54 33.54L65.29 217.7A15.72 15.72 0 0 0 64 224v176a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16v-16h256v16a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V224a16.15 16.15 0 0 0-.32-3.22ZM144 320a32 32 0 1 1 32-32a32 32 0 0 1-32 32Zm224 0a32 32 0 1 1 32-32a32 32 0 0 1-32 32ZM104.26 208l28.23-65.85C136.11 133.69 146 128 157.11 128h197.78c11.1 0 21 5.69 24.62 14.15L407.74 208Z"
                    />
                  </svg>
                  <div className="flexx flex-col">
                    <div>{regnr}</div>
                    <div>
                      {regnr === userData?.primaryCarRegNumber ? (
                        <p>Primærbil</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </React.Fragment>
        ))}
      </>
    )
}

export default MyCars
