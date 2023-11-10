"use client"
import { useUserDataContext } from "@/app/contexts/UserContex"
import React, { useEffect, useState } from "react"

const EditCars = () => {
  const { userData, getUserData } = useUserDataContext()

  const [regNumbers, setRegNumbers] = useState<string[]>([""])

  useEffect(() => {
    setRegNumbers(userData?.carRegNumbers ?? [""])
  }, [userData])

  const addInput = (index: number, newValue: string) => {
    const newRegnrs = [...regNumbers]
    newRegnrs[index] = newValue

    setRegNumbers(newRegnrs)
  }

  const removeInput = (regnrIndex: number) => {
    if (regNumbers.length < 2) {
      console.log("KAN IKKE FJERNE, MÅ HA 1 REG NR")
    } else {
      const filterRegnrs = regNumbers.filter((_, index) => index !== regnrIndex)
      setRegNumbers(filterRegnrs)
    }
  }

  const addNewInput = () => {
    setRegNumbers([...regNumbers, ""])
  }

  const addNewRegList = async () => {
    const payload = {
      carRegNumbers: regNumbers,
    }

    try {
      await fetch(`/api/users/${userData?.email}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("SUCCESS")
          getUserData()
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

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
            </div>
            <div className="mb-6"></div>
          </React.Fragment>
        ))}
        <div className="flex flex-row ...">
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
        <button
          onClick={() => addNewRegList()}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <div className="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              className="mr-6"
            >
              <path
                fill="currentColor"
                d="M7 19v-6h10v6h2V7.828L16.172 5H5v14h2ZM4 3h13l4 4v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm5 12v4h6v-4H9Z"
              />
            </svg>
            <p className="text-lg">Lagre</p>
          </div>
        </button>
      </div>
    </>
  )
}

export default EditCars
