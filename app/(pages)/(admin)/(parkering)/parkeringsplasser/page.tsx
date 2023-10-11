"use client";
import Sidebar from "@/app/components/shared/Sidebar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ParkeringsListe from "@/app/components/parkering/ParkeringsListe";
import ParkingContext from "@/app/contexts/ParkingContext";
import { ParkingLot } from "@/app/contexts/ParkingContext";
import dynamic from "next/dynamic";

const MapComp = dynamic(
  () => import("@/app/components/parkering/ParkeringMap"),
  {
    ssr: false,
  }
);

const Page = () => {
  const [parkingList, setParkingList] = useState<ParkingLot[]>([]);
  const [search, setSearch] = useState<string | null>("");

  // Først setter jeg koordinater i en state. Dette er default koordinater når brukeren laster inn siden.
  // Denne brukes i Map.tsx og i Tabell.tsx
  const [currentCoordinates, setCurrentCoordinates] = useState<
    [number, number]
  >([59.212575443746296, 10.924253141809777]);

  // Dette er en state for å hente navn av den parkeringsplassen som ble valgt i listen.
  // Denne brukes i Tabell.tsx og nede i Rediger component.
  const [pickedParking, setPickedParking] = useState<[number, number] | null>(
    null
  );

  // Wrapper AppContext.Provider i ytterste lag, og dette utnytter useContext hooken, slik at alle variabler kan brukes i de andre komponentene, uten at jeg må sende de ned via props.
  // Dette forsikrer at jeg ikke må loke rundt med nesting av props gjennom flere lag av komponenter, som kan være tidskrevende.
  return (
    <>
      <ParkingContext.Provider
        value={{
          parkingList,
          setParkingList,
          search,
          setSearch,
          currentCoordinates,
          setCurrentCoordinates,
          pickedParking,
          setPickedParking,
        }}
      >
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
      </ParkingContext.Provider>
    </>
  );
};

const Tabell = () => {
  const router = useRouter();

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
  );
};

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
  );
};

const Logg = () => {
  return (
    <>
      <div>Hendelser</div>
    </>
  );
};

export default Page;
