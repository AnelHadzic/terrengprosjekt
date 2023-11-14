"use client"
import ChooseParking from "./components/UserParking/ChooseParking"
import Loading from "./components/shared/Loading"
import { useUserDataContext } from "./contexts/UserContex"

export default function Home() {
  return (
    <>
      <main className="bg-white flex flex-col items-center min-h-screen p-4 sm:p-8">
        <MainContent />
      </main>
    </>
  )
}

function MainContent() {
  const { userData, parkingSession, status } = useUserDataContext()

  if (status === "loading") {
    return <Loading />
  } else {
    return (
      <>
        <p className="mb-10">Du er logget inn som {userData?.email}</p>
        {parkingSession?.length > 0 ? <ActiveParking /> : <InActiveParking />}
      </>
    )
  }
}

const ActiveParking = () => {
  const { parkingSession, getUserData } = useUserDataContext()

  const stopParking = async () => {
    const stopTime = new Date()

    const payload = {
      endTime: stopTime,
    }

    await fetch(`/api/parkingSession/by-id/${parkingSession[0]?._id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to update parking session. Status: ${response.status}. Response: ${response.statusText}`,
          )
        }
        return response.json()
      })
      .then((data) => {
        getUserData()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const formattedEndTime = parkingSession[0].endTime
    ? new Date(parkingSession[0].endTime).toLocaleString(undefined, {
        timeStyle: "short",
      })
    : ""

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 512 512"
      >
        <path
          fill="#4ecb71"
          d="M447.68 220.78a16 16 0 0 0-1-3.08l-37.78-88.16C400.19 109.17 379 96 354.89 96H157.11c-24.09 0-45.3 13.17-54 33.54L65.29 217.7A15.72 15.72 0 0 0 64 224v176a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16v-16h256v16a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V224a16.15 16.15 0 0 0-.32-3.22ZM144 320a32 32 0 1 1 32-32a32 32 0 0 1-32 32Zm224 0a32 32 0 1 1 32-32a32 32 0 0 1-32 32ZM104.26 208l28.23-65.85C136.11 133.69 146 128 157.11 128h197.78c11.1 0 21 5.69 24.62 14.15L407.74 208Z"
        />
      </svg>

      <p className="mb-6">DIN PARKERING ER AKTIV TIL</p>
      <button
        type="button"
        className=" mb-6 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        {formattedEndTime}
      </button>
      <p className="mb-2">Parkeringsplass: {parkingSession[0].parkingName}</p>
      <p className="mb-2">Valgt Regnr: {parkingSession[0].licensePlate}</p>
      <button
        onClick={() => stopParking()}
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        STOPP PARKERING
      </button>
    </>
  )
}

const InActiveParking = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 512 512"
      >
        <path
          fill="#ccc"
          d="M447.68 220.78a16 16 0 0 0-1-3.08l-37.78-88.16C400.19 109.17 379 96 354.89 96H157.11c-24.09 0-45.3 13.17-54 33.54L65.29 217.7A15.72 15.72 0 0 0 64 224v176a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16v-16h256v16a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V224a16.15 16.15 0 0 0-.32-3.22ZM144 320a32 32 0 1 1 32-32a32 32 0 0 1-32 32Zm224 0a32 32 0 1 1 32-32a32 32 0 0 1-32 32ZM104.26 208l28.23-65.85C136.11 133.69 146 128 157.11 128h197.78c11.1 0 21 5.69 24.62 14.15L407.74 208Z"
        />
      </svg>

      <p className="mb-6">Du har ingen aktive parkeringer</p>
      <ChooseParking />
    </>
  )
}
