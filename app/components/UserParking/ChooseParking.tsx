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
          console.log(data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <>
      <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
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
              <div className="flex flex-row align-center">
                <p className="text-xl">START PARKERING</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  className="ml-6"
                >
                  <path
                    fill="currentColor"
                    d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.736 4 21.276 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648l12.812 6.968Z"
                  />
                </svg>
              </div>
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
          <div className="flex flex-row align-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 48 48"
              className="mr-6"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="4"
              >
                <path d="M24 44s16-12 16-25c0-8.284-7.163-15-16-15S8 10.716 8 19c0 13 16 25 16 25Z" />
                <path strokeLinecap="round" d="M21 14v16" />
                <path d="M21 14h6a4 4 0 0 1 0 8h-6v-8Z" />
              </g>
            </svg>

            <p className="text-xl">{item.parkingName}</p>
          </div>
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
