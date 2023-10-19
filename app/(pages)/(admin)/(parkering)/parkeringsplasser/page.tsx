"use client"
import { useRouter } from "next/navigation"
import ParkeringsListe from "@/app/components/parkering/ParkeringsListe"
import dynamic from "next/dynamic"
import { ParkingProvider } from "@/app/contexts/ParkingContext"

const MapComp = dynamic(
  () => import("@/app/components/parkering/ParkeringMap"),
  {
    ssr: false,
  },
)

const Page = () => {
  return (
    <>
      <ParkingProvider>
        <main className="flex min-h-screen flex-col items-center">
          <div className="mb-6"></div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Tabell />
            </div>
            <div>
              <Map />
            </div>
          </div>
          <div className="mt-6"></div>
          <Logg />
        </main>
      </ParkingProvider>
    </>
  )
}

const Tabell = () => {
  const router = useRouter()

  return (
    <>
      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            Parkeringsplasser
          </h5>
          <ParkeringsListe />
          <div className="mb-6"></div>
          <button
            onClick={() => router.push("/ny-parkering")}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Legg til ny parkeringsplass
          </button>
        </div>
      </div>
    </>
  )
}

const Map = () => {
  return (
    <>
      <div className="flex-grow">
        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Interaktiv kart
            </h5>
            <MapComp />
          </div>
        </div>
      </div>
    </>
  )
}

const Logg = () => {
  return (
    <>
      <div>Hendelser</div>
    </>
  )
}

export default Page
