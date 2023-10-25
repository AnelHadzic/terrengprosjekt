import React, { useState, useEffect, Fragment } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css" // Import the styles
import { IUser } from "@/app/lib/interface/IUser"
import { parkingProps } from "@/app/(pages)/inspectorTool/page"

const ChooseParking = ({
  userData,
  getUserData,
}: {
  userData: IUser | undefined
  getUserData: () => void
}) => {
  const [parkingSpots, setParkingSpots] = useState<[]>([])
  const [chosenParking, setChosenParking] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<Date | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/parkingLot`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        })
        const result = await response.json()
        setParkingSpots(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const currentTime = new Date()
  const endTime = new Date(currentTime.getTime() + 8 * 60 * 60 * 1000)
  const startParking = async () => {
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
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Hvor skal du parkere?
        </h5>
        {parkingSpots.map((item: parkingProps, index) => (
          <Fragment key={index}>
            <button
              onClick={() => setChosenParking(item.parkingName)}
              className="inline-flex items-center px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {item.parkingName}
            </button>
          </Fragment>
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
