"use client"
import { useUserDataContext } from "@/app/contexts/UserContex"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

const EditCars = () => {
  const { userData, getUserData } = useUserDataContext()

  const [regNumbers, setRegNumbers] = useState<string[]>([""])
  const [primaryCar, setPrimaryCar] = useState<string>("")

  useEffect(() => {
    setRegNumbers(userData?.carRegNumbers ?? [""])
    setPrimaryCar(userData?.primaryCarRegNumber ?? "")
  }, [userData])

  const addInput = (index: number, newValue: string) => {
    const newRegnrs = [...regNumbers]
    newRegnrs[index] = newValue

    setRegNumbers(newRegnrs)
  }

  const removeInput = (regnrIndex: number, regnr: string) => {
    if (regNumbers.length < 2) {
    } else {
      const filterRegnrs = regNumbers.filter((_, index) => index !== regnrIndex)
      setRegNumbers(filterRegnrs)

      if (regnr === primaryCar) {
        setPrimaryCar("")
      }
    }
  }

  const addNewInput = () => {
    setRegNumbers([...regNumbers, ""])
  }

  const addNewRegList = async () => {
    if (primaryCar === "") {
      toast.error("Kunne ikke lagre endringer. Mangler primærbil.")
      return
    }
    const payload = {
      carRegNumbers: regNumbers,
      primaryCarRegNumber: primaryCar,
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
          toast.success("Lagret endringer")
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

              <button
                type="button"
                onClick={() => setPrimaryCar(regnr)}
                className={
                  regnr === primaryCar
                    ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m5 13l1.5-4.5h11L19 13m-1.5 5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5s1.5.7 1.5 1.5s-.7 1.5-1.5 1.5m-11 0c-.8 0-1.5-.7-1.5-1.5S5.7 15 6.5 15s1.5.7 1.5 1.5S7.3 18 6.5 18M18.9 8c-.2-.6-.8-1-1.4-1h-11c-.7 0-1.2.4-1.4 1L3 14v8c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-1h12v1c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-8M8 1l4 4.5L16 1Z"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => removeInput(index, regnr)}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 22 22"
                >
                  <path
                    fill="currentColor"
                    d="M10 7v9H8V7h2m2 0h2v9h-2V7M8 2h6v1h5v2h-1v14h-1v1H5v-1H4V5H3V3h5V2M6 5v13h10V5H6Z"
                  />
                </svg>
              </button>
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
      </div>
    </>
  )
}

export default EditCars
