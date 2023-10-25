"use client"
import React, { useEffect, useState } from "react"

export type parkingProps = {
  parkingName: string
  startTime: Date
  endTime: Date
  licensePlate: string
}

const Page = () => {
  const [regNr, setRegNr] = useState<string>("")
  const [parkingData, setParkingData] = useState<parkingProps | null>()
  const [invalidParking, setInvalidParking] = useState<boolean>(false)

  const handleCheck = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setParkingData(null)
    setInvalidParking(false)
    try {
      const response = await fetch(`/api/parkingSession/by-regnr/${regNr}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
      const result = await response.json()
      if (response.status === 200) {
        setParkingData(result.data)
      } else if (result.data === "Not found") {
        setInvalidParking(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col ... items-center justify-center">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className=" flex flex-row mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Kontroll parkering{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              className="ml-2"
            >
              <path
                fill="currentColor"
                d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"
              />
            </svg>
          </h5>
          <div className="mb-6">
            <form onSubmit={handleCheck}>
              <label
                htmlFor="regnr"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bilens regnr
              </label>
              <input
                onChange={(e) => setRegNr(e.target.value)}
                type="text"
                id="regnr"
                className=" mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="AE 12345"
                required
              />

              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sjekk
              </button>
            </form>
          </div>
          {parkingData && (
            <GodkjentParkering
              parkingName={parkingData.parkingName}
              startTime={new Date(parkingData.startTime)}
              endTime={new Date(parkingData.endTime)}
              licensePlate={parkingData.licensePlate}
            />
          )}
          {invalidParking === true && <IkkeGodkjentParkering regNr={regNr} />}
        </div>
      </div>
    </>
  )
}

const GodkjentParkering = (props: parkingProps) => {
  const { parkingName, startTime, endTime, licensePlate } = props

  const formattedStartTime = startTime ? startTime.toLocaleString() : ""
  const formattedEndTime = endTime ? endTime.toLocaleString() : ""

  return (
    <>
      <div className="max-w-sm p-6 bg-emerald-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            className="mr-4"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10ZM7 12l4 3l5-7"
            />
          </svg>

          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Parkering Godkjent
          </h5>
        </div>
        <div className="mb-3"></div>
        <p>REGNR: {licensePlate}</p>
        <p>Parkeringsplass: {parkingName}</p>
        <p>Start tid: {formattedStartTime}</p>
        <p>Gyldig til: {formattedEndTime}</p>
        <p></p>
      </div>
    </>
  )
}

const IkkeGodkjentParkering = ({ regNr }: { regNr: string }) => {
  return (
    <>
      <div className="max-w-sm p-6 bg-grey-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 16 16"
            className="mr-4"
          >
            <path
              fill="currentColor"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13ZM6.92 6.085h.001a.749.749 0 1 1-1.342-.67c.169-.339.436-.701.849-.977C6.845 4.16 7.369 4 8 4a2.756 2.756 0 0 1 1.637.525c.503.377.863.965.863 1.725c0 .448-.115.83-.329 1.15c-.205.307-.47.513-.692.662c-.109.072-.22.138-.313.195l-.006.004a6.24 6.24 0 0 0-.26.16a.952.952 0 0 0-.276.245a.75.75 0 0 1-1.248-.832c.184-.264.42-.489.692-.661c.103-.067.207-.132.313-.195l.007-.004c.1-.061.182-.11.258-.161a.969.969 0 0 0 .277-.245C8.96 6.514 9 6.427 9 6.25a.612.612 0 0 0-.262-.525A1.27 1.27 0 0 0 8 5.5c-.369 0-.595.09-.74.187a1.01 1.01 0 0 0-.34.398ZM9 11a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"
            />
          </svg>

          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Finner ikke parkering
          </h5>
        </div>
        <div className="mb-3"></div>
      </div>
    </>
  )
}
export default Page
