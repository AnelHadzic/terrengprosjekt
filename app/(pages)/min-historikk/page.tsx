"use client"
import Loading from "@/app/components/shared/Loading"
import { useUserDataContext } from "@/app/contexts/UserContex"
import { IParkingSession } from "@/app/lib/interface/IParkingSession"
import format from "date-fns/format"
import { nb } from "date-fns/locale"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

const Page = () => {
  return (
    <>
      <main className="bg-white flex flex-col items-center min-h-screen p-4 sm:p-8">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <MainContent />
        </div>
      </main>
    </>
  )
}

const MainContent = () => {
  const { userData } = useUserDataContext()
  const [userParkingHistory, setUserParkingHistory] = useState<
    IParkingSession[] | null | undefined
  >(undefined)

  const [page, setPage] = useState<number>(1)

  const fetchParkingSessions = async () => {
    const API_URL = `/api/parkingSession/history-by-email/${userData?.email}`

    if (!userData) {
      return
    }

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })

      const result = (await response.json()) as { data: IParkingSession[] }

      setUserParkingHistory(result.data)
    } catch (error) {
      console.error("Error fetching parking sessions:", error)
    }
  }

  useEffect(() => {
    if (userData) {
      fetchParkingSessions()
    }
    console.log(userParkingHistory)
  }, [userData])

  if (userParkingHistory === undefined) {
    return <Loading />
  }

  if (userData && userParkingHistory === null) {
    return <p>Fant ingen parkeringer</p>
  }

  if (userParkingHistory) {
    return (
      <>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Min parkeringshistorikk
        </h1>
        <p>{userData?.email}</p>
        <p>Side: {page}</p>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

        <div className="flex flex-col items-center">
          {userParkingHistory.map((parking) => (
            <div
              key={parking._id}
              className="max-w-sm min-w-[300px] mb-3 p-6 bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  className="mr-6"
                >
                  <g fill="none">
                    <path
                      fill="currentColor"
                      d="M2 9c0-1.886 0-2.828.586-3.414C3.172 5 4.114 5 6 5h12c1.886 0 2.828 0 3.414.586C22 6.172 22 7.114 22 9c0 .471 0 .707-.146.854C21.707 10 21.47 10 21 10H3c-.471 0-.707 0-.854-.146C2 9.707 2 9.47 2 9Zm0 9c0 1.886 0 2.828.586 3.414C3.172 22 4.114 22 6 22h12c1.886 0 2.828 0 3.414-.586C22 20.828 22 19.886 22 18v-5c0-.471 0-.707-.146-.854C21.707 12 21.47 12 21 12H3c-.471 0-.707 0-.854.146C2 12.293 2 12.53 2 13v5Z"
                    />
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M7 3v3m10-3v3"
                    />
                  </g>
                </svg>

                <p className="text-lg font-bold">
                  {" "}
                  {format(new Date(parking.startTime), "dd.MM.yyyy", {
                    locale: nb,
                  })}
                </p>
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
                    d="M13.2 11H10V7h3.2a2 2 0 0 1 2 2a2 2 0 0 1-2 2M13 3H6v18h4v-6h3a6 6 0 0 0 6-6c0-3.32-2.69-6-6-6Z"
                  />
                </svg>
                <p className="text-lg">{parking.parkingName}</p>
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

                <p className="text-lg">
                  {" "}
                  {format(new Date(parking.startTime), "HH:mm")}-
                  {format(new Date(parking.endTime), "HH:mm")}
                </p>
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

                <p className="text-lg">{parking.licensePlate}</p>
              </div>
            </div>
          ))}
          <Pagination page={page} setPage={setPage} />
        </div>
      </>
    )
  }
}

const Pagination = ({
  page,
  setPage,
}: {
  page: number
  setPage: Dispatch<SetStateAction<number>>
}) => {
  return (
    <>
      <div className="flex">
        {page > 1 && (
          <>
            <button
              type="button"
              onClick={() => setPage((prev) => prev - 1)}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              <svg
                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Tilbake
            </button>
          </>
        )}
        <button
          type="button"
          onClick={() => setPage((prev) => prev + 1)}
          className="text-white flex flex-row bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Neste
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </>
  )
}

export default Page
