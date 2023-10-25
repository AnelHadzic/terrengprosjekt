"use client"

import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { IParkingSession } from "./lib/interface/IParkingSession"
import { IUser } from "./lib/interface/IUser"
import { useRouter } from "next/navigation"
import ChooseParking from "./components/UserParking/ChooseParking"

export default function Home() {
  const { data: session, status } = useSession()

  const [userData, setUserData] = useState<IUser | undefined>(undefined)
  const [parkingSession, setParkingSession] = useState<IParkingSession[]>([])

  const getUserData = async () => {
    const response = await fetch(`/api/users/${session?.user?.email}`, {
      method: "GET",
    })

    const result = (await response.json()) as { data: IUser }
    setUserData(result.data)
    getParkingSession()
  }

  const getParkingSession = async () => {
    const response = await fetch(
      `/api/parkingSession?${userData?.primaryCarRegNumber}`,
      {
        method: "GET",
      },
    )

    const result = (await response.json()) as { data: IParkingSession[] }
    setParkingSession(result.data)
  }

  useEffect(() => {
    if (session) {
      getUserData()
    }
  }, [session])

  return (
    <>
      <main className="bg-white flex flex-col items-center min-h-screen p-4 sm:p-8">
        {status === "loading" && (
          <>
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </>
        )}
        {status === "authenticated" && (
          <>
            <p className="mb-10">Du er logget inn som {session?.user?.email}</p>
            {parkingSession?.length > 0 ? (
              <ActiveParking
                parkingSession={parkingSession}
                getUserData={getUserData}
              />
            ) : (
              <InActiveParking userData={userData} getUserData={getUserData} />
            )}
          </>
        )}
      </main>
    </>
  )
}

const ActiveParking = ({
  parkingSession,
  getUserData,
}: {
  parkingSession: IParkingSession[]
  getUserData: () => Promise<void>
}) => {
  const stopParking = async () => {
    await fetch(`/api/parkingSession/by-id/${parkingSession[0]?._id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        getUserData()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const formattedEndTime = parkingSession[0].endTime
    ? parkingSession[0].endTime.toLocaleString()
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

const InActiveParking = ({
  userData,
  getUserData,
}: {
  userData: IUser | undefined
  getUserData: () => Promise<void>
}) => {
  const router = useRouter()

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
      <ChooseParking userData={userData} getUserData={getUserData} />
    </>
  )
}
