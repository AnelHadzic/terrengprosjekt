"use client"
import axios from "axios"
import { LatLngLiteral } from "leaflet"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export interface MapLayer {
  id: number | string
  latlngs: LatLngLiteral[]
}

const MapComp = dynamic(
  () => import("@/app/components/parkering/AddNewParking"),
  {
    ssr: false,
    loading: () => <p>Laster...</p>,
  },
)

const Page = () => {
  const [parking, setParking] = useState<string>("")
  const [capacity, setCapacity] = useState<number>()
  const [parkingControl, setParkingControl] = useState<string | undefined>(
    undefined,
  )
  const [mapLayers, setMapLayers] = useState<MapLayer[]>([])

  const [error, setError] = useState<string>("")
  const [status, setStatus] = useState<string>("")

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (mapLayers.length === 0 || !mapLayers[0].latlngs) {
      setError("Finner ingen koordinater. Har du lagt dem inn i kartet?")
      return
    }

    const parkingCoordinates = mapLayers[0].latlngs.map((latlng) => [
      latlng.lat,
      latlng.lng,
    ])

    const payload = {
      parkingName: parking,
      parkingCapacity: capacity,
      parkingCoordinates: parkingCoordinates,
      parkingControl: parkingControl,
    }

    try {
      const response = await axios.post("/api/parkingLot", payload)
      router.push("/parkeringsplasser")
    } catch (error) {
      setError("Noe gikk galt")
      console.error(error)
    }
  }

  return (
    <>
      <div className="mb-6"></div>
      <main className="flex min-h-screen flex-col items-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Registrer ny parkeringsplass
        </h5>
        {status && <div>{status}</div>}
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Parkeringsnavn
            </label>
            <input
              type="text"
              id="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="P1"
              onChange={(e) => setParking(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="kapasitet"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Kapasitet
            </label>
            <input
              type="number"
              id="kapasitet"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setCapacity(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="parkingControl"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Kontrollnivå for parkeringsplassen
            </label>
            <select
              id="parkingControl"
              value={parkingControl}
              onChange={(e) => setParkingControl(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Velg kontrollnivå</option>
              <option value="Lav">Lav</option>
              <option value="Medium">Medium</option>
              <option value="Høy">Høy</option>
            </select>
          </div>
          <MapComp mapLayers={mapLayers} setMapLayers={setMapLayers} />
          <div className="mb-6"></div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </form>
      </main>
    </>
  )
}

export default Page
