import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useRouter } from "next/navigation"
import { useUserDataContext } from "@/app/contexts/UserContex"
import { IParkingSpot } from "@/app/contexts/interface/CompanyAgreement"
import dynamic from "next/dynamic"

const MapComp = dynamic(
  () => import("@/app/components/parkering/UserParkering"),
  {
    ssr: false,
  },
)

const ChooseParking = () => {
  const [chosenParking, setChosenParking] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<Date | null>(null)

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
      <div className="flex flex-col justify-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <MyCar />
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <PickTime
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

        {selectedTime && (
          <>
            <PickParkingSpot
              parkingSpots={parkingSpots}
              setChosenParking={setChosenParking}
              chosenParking={chosenParking}
            />
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          </>
        )}

        {chosenParking && selectedTime && (
          <>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              4. Start din parkering
            </h5>
            <button
              onClick={() => startParking()}
              className="flex justify-center items-center w-full mt-6 px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              START PARKERING
            </button>
          </>
        )}
      </div>
    </>
  )
}

const MyCar = () => {
  const { userData } = useUserDataContext()
  const router = useRouter()
  return (
    <>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        1. Velg bil
      </h5>
      <p
        onClick={() => router.push(`/mine-biler`)}
        className="flex justify-center border-dotted  border-2 border-indigo-600 ... mb-3"
      >
        {userData?.primaryCarRegNumber}
      </p>
    </>
  )
}

const PickTime = ({
  selectedTime,
  setSelectedTime,
}: {
  selectedTime: Date | null
  setSelectedTime: React.Dispatch<React.SetStateAction<Date | null>>
}) => {
  return (
    <>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        2. Velg tidspunkt
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
  )
}

const PickParkingSpot = ({
  parkingSpots,
  setChosenParking,
  chosenParking,
}: {
  parkingSpots: IParkingSpot[] | undefined
  setChosenParking: React.Dispatch<React.SetStateAction<string>>
  chosenParking: string
}) => {
  return (
    <>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        3. Hvor skal du parkere?
      </h5>
      {parkingSpots?.map((item: IParkingSpot, index) => (
        <button
          className="text-white mb-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          key={index}
          onClick={() => setChosenParking(item.parkingName)}
        >
          {item.parkingName}
        </button>
      ))}
      {chosenParking ? (
        <>
          <div className="flex justify-center border-solid border-2 border-gray-600 ...">
            {" "}
            <p>Valgt: {chosenParking}</p>{" "}
          </div>
          <MapComp parkingName={chosenParking} />
        </>
      ) : null}
    </>
  )
}

export default ChooseParking
