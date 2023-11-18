"use client"
import ChooseParking from "./components/UserParking/ChooseParking"
import Loading from "./components/shared/Loading"
import { useUserDataContext } from "./contexts/UserContex"
import { add, format } from "date-fns"

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

  if (status === "loading" && !userData && parkingSession === undefined) {
    return <Loading />
  }

  if (parkingSession === null) {
    return <InActiveParking />
  }

  return <ActiveParking />
}

const ActiveParking = () => {
  const { parkingSession, getUserData } = useUserDataContext()

  if (!parkingSession) {
    return <Loading />
  }

  const stopParking = async () => {
    const stopTime = new Date()

    const payload = {
      endTime: stopTime,
    }

    await fetch(`/api/parkingSession/by-id/${parkingSession._id}`, {
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

  const endTimeParking = new Date(parkingSession.endTime)

  const norwegianDate = format(endTimeParking, "HH:mm")

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="bg-green-500 p-10 flex items-center justify-center rounded-t-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-11 0A1.5 1.5 0 0 1 5 14.5A1.5 1.5 0 0 1 6.5 13A1.5 1.5 0 0 1 8 14.5A1.5 1.5 0 0 1 6.5 16M18.92 6c-.2-.58-.76-1-1.42-1h-11c-.66 0-1.22.42-1.42 1L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8l-2.08-6Z" />
        </svg>
      </div>
      <div className="p-5">
        <span className="bg-green-100 text-green-800 text-lg font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
          AKTIV PARKERING
        </span>{" "}
        <div className="mb-6"></div>
        <div className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className="mr-6"
          >
            <path
              fill="currentColor"
              d="M13.2 11H10V7h3.2a2 2 0 0 1 2 2a2 2 0 0 1-2 2M13 3H6v18h4v-6h3a6 6 0 0 0 6-6c0-3.32-2.69-6-6-6Z"
            />
          </svg>
          <p className="text-lg">{parkingSession.parkingName}</p>
        </div>
        <div className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className="mr-6"
          >
            <path
              fill="currentColor"
              d="M15.098 12.634L13 11.423V7a1 1 0 0 0-2 0v5a1 1 0 0 0 .5.866l2.598 1.5a1 1 0 1 0 1-1.732ZM12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8a8.01 8.01 0 0 1-8 8Z"
            />
          </svg>

          <p className="text-lg">{norwegianDate}</p>
        </div>
        <div className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className="mr-6"
          >
            <path
              fill="currentColor"
              d="m5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-11 0A1.5 1.5 0 0 1 5 14.5A1.5 1.5 0 0 1 6.5 13A1.5 1.5 0 0 1 8 14.5A1.5 1.5 0 0 1 6.5 16M18.92 6c-.2-.58-.76-1-1.42-1h-11c-.66 0-1.22.42-1.42 1L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8l-2.08-6Z"
            />
          </svg>

          <p className="text-lg">{parkingSession.licensePlate}</p>
        </div>
      </div>
      <div
        onClick={() => stopParking()}
        className="bg-red-500 p-5 flex items-center justify-center hover:bg-red-700 cursor-pointer rounded-b-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 256 256"
          className="mr-4"
        >
          <path
            fill="white"
            d="M216 55.27v145.46A15.29 15.29 0 0 1 200.73 216H55.27A15.29 15.29 0 0 1 40 200.73V55.27A15.29 15.29 0 0 1 55.27 40h145.46A15.29 15.29 0 0 1 216 55.27Z"
          />
        </svg>
        <p className="text-white">STOPP</p>
      </div>
    </div>
  )
}

const InActiveParking = () => {
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="bg-gray-500 p-5 flex items-center justify-center rounded-t-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-11 0A1.5 1.5 0 0 1 5 14.5A1.5 1.5 0 0 1 6.5 13A1.5 1.5 0 0 1 8 14.5A1.5 1.5 0 0 1 6.5 16M18.92 6c-.2-.58-.76-1-1.42-1h-11c-.66 0-1.22.42-1.42 1L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8l-2.08-6Z" />
          </svg>
        </div>
        <div className="p-5">
          <span className="bg-gray-100 text-gray-800 text-lg font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            INAKTIV PARKERING
          </span>
        </div>{" "}
        <ChooseParking />
      </div>
    </>
  )
}
