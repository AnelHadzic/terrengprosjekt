import { useNewCompanyContext } from "@/app/contexts/NewCompanyContext"
import axios from "axios"
import React, { Fragment, useEffect, useState } from "react"

export type ParkingLot = {
  parkingName: string
  parkingCapacity: number
}

const PrivateParking = () => {
  const { privateParkings, setPrivateParkings } = useNewCompanyContext()

  const [parkingList, setParkingList] = useState<ParkingLot[]>([])
  const [search, setSearch] = useState<string | null>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = "http://localhost:3000/api/parkingLot"
        const response = await axios.get(API_URL)
        setParkingList(response.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [parkingList])

  // Filtrerer databasen basert på hva search staten er.
  // Setter data i lowercase, og dataen inkluderer hva lowercase søkeordet er.
  const filteredList = parkingList.filter((parkering) =>
    search
      ? parkering.parkingName.toLowerCase().includes(search.toLowerCase())
      : true,
  )

  const handleCheckboxChange = (parking: ParkingLot, checked: boolean) => {
    if (checked) {
      setPrivateParkings((prev) => [
        ...prev,
        { parkingName: parking.parkingName, parkingLimit: 0 },
      ])
    } else {
      setPrivateParkings((prev) =>
        prev.filter((p) => p.parkingName !== parking.parkingName),
      )
    }
  }

  const handleNumberChange = (parkingName: string, value: number) => {
    setPrivateParkings((prev) =>
      prev.map((p) =>
        p.parkingName === parkingName ? { ...p, parkingLimit: value } : p,
      ),
    )
  }

  return (
    <>
      <div className="mb-6"></div>
      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            Parkeringsplasser
          </h5>
          <input
            type="text"
            placeholder="Søk parkeringsplass"
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md p-2 w-400 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
          />
          <div className="mb-6"></div>
          <div className="max-h-[300px] overflow-y-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Parkering
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      Kapasitet
                      <a href="#">
                        <svg
                          className="w-3 h-3 ml-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Velg
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Antall plasser
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((item, index) => {
                  const isChecked = privateParkings.some(
                    (p) => p.parkingName === item.parkingName,
                  )

                  return (
                    <Fragment key={index}>
                      <tr data-name={item.parkingName}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.parkingName}
                        </th>
                        <td className="px-6 py-4">{item.parkingCapacity}</td>
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) =>
                              handleCheckboxChange(item, e.target.checked)
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="border rounded-md p-2 w-400 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
                            type="number"
                            placeholder="Antall"
                            disabled={!isChecked}
                            value={
                              privateParkings.find(
                                (p) => p.parkingName === item.parkingName,
                              )?.parkingLimit || ""
                            }
                            onChange={(e) =>
                              handleNumberChange(
                                item.parkingName,
                                parseInt(e.target.value),
                              )
                            }
                          />
                        </td>
                      </tr>
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
            <div className="mb-6"></div>
            <span>Valgte parkeringsplasser: </span>
            {privateParkings.map((item) => (
              <span key={item.parkingName}>
                {item.parkingName}: {item.parkingLimit},{" "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivateParking
