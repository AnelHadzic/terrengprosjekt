"use client"
import React, { useEffect, Fragment } from "react"
import axios from "axios"
import { useParkingContext } from "@/app/contexts/ParkingContext"

const ParkeringsListe = () => {
  const { parkingList, setParkingList, search, setSearch, setPickedParking } =
    useParkingContext()

  // Dersom man velger noe fra tabellen, vil den hente disse dataene, så sette statene slik at vi kan bruke de i App.tsx og Main.tsx
  const pickedParking = (e: {
    currentTarget: { getAttribute: (arg0: string) => any }
  }) => {
    const parkeringPlass = e.currentTarget.getAttribute("data-center")
    const [latitude, longitude] = parkeringPlass.split(",").map(parseFloat)
    setPickedParking([latitude, longitude])
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = "/api/parkingLot"
        const response = await axios.get(API_URL)
        setParkingList(response.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  // Filtrerer basert på hva search staten er.
  // Setter data i lowercase, og dataen inkluderer hva lowercase søkeordet er.
  const filteredList = parkingList.filter((parkering) =>
    search
      ? parkering.parkingName.toLowerCase().includes(search.toLowerCase())
      : true,
  )

  return (
    <>
      <input
        type="text"
        placeholder="Søk parkeringsplass"
        value={search || ""}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md p-2 w-400 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
      />
      <div className="mb-6"></div>
      <p>Parkeringsplasser funnet: {filteredList.length}</p>
      <div className="mb-3"></div>
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
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((item, index) => (
              <Fragment key={index}>
                <tr
                  className="border-b dark:border-neutral-500 hover:bg-gray-200 cursor-pointer"
                  onClick={pickedParking}
                  data-center={[item.parkingCoordinates[0]]}
                  data-name={item.parkingName}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.parkingName}
                  </th>
                  <td className="px-6 py-4">{item.parkingCapacity}</td>
                  <td className="px-6 py-4">
                    <a href="#">Se</a>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ParkeringsListe
