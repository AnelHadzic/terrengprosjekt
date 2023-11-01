import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useRouter } from "next/navigation"
import { useUserDataContext } from "@/app/contexts/UserContex"
import { IParkingSpot } from "@/app/contexts/interface/CompanyAgreement"

const ChooseParking = () => {
  const [chosenParking, setChosenParking] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<Date | null>(null)
  const router = useRouter()

  const { userCompany, userData, getUserData } = useUserDataContext()

  const parkingSpots: IParkingSpot[] | undefined = userCompany?.agreementData

  const startParking = async () => {
    const currentTime = new Date()

    // Midlertidig løsning for å få vår tidssone
    currentTime.setHours(currentTime.getHours() + 1)

    if (userData) {
      const payload = {
        parkingName: chosenParking,
        startTime: currentTime,
        endTime: selectedTime,
        licensePlate: userData.primaryCarRegNumber,
      }
      await fetch(`/api/parkingSession`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          getUserData()
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <p
          onClick={() => router.push(`/mine-biler`)}
          className="flex justify-center border-dotted  border-2 border-indigo-600 ... mb-3"
        >
          {userData?.primaryCarRegNumber}
        </p>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Hvor skal du parkere?
        </h5>
        {parkingSpots?.map((item: IParkingSpot, index) => (
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            key={index}
            onClick={() => setChosenParking(item.parkingName)}
          >
            {item.parkingName}
          </button>
        ))}

        <p>Valgt: {chosenParking}</p>
        <div className="mb-6"></div>
        <hr className="mb-6" />

        {chosenParking && (
          <>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Velg tidspunkt
            </h5>

            <div className="w-64">
              <DatePicker
                selected={selectedTime}
                onChange={(date) => setSelectedTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="rounded-lg w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
          </>
        )}

        {chosenParking && selectedTime && (
          <button
            onClick={() => startParking()}
            className="inline-flex mt-6 items-center px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Start parkering
          </button>
        )}
      </div>
    </>
  )
}

export default ChooseParking
