import React, { createContext } from "react";

export type ParkingLot = {
  parkingName: string;
  parkingCapacity: number;
  parkingCoordinates: number[][];
};

export const ParkingContext = createContext<{
  // Lagrer liste med parkeringer. GET
  parkingList: ParkingLot[];
  setParkingList: React.Dispatch<React.SetStateAction<ParkingLot[]>>;

  // Koordinater
  currentCoordinates: [number, number];
  setCurrentCoordinates: React.Dispatch<React.SetStateAction<[number, number]>>;

  // Valgt parkering
  pickedParking: [number, number] | null;
  setPickedParking: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;

  // Søk for liste
  search: string | null;
  setSearch: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  // Setter forventet default value
  parkingList: [],
  setParkingList: () => {},
  currentCoordinates: [59.212575443746296, 10.924253141809777],
  setCurrentCoordinates: () => {},
  pickedParking: null,
  setPickedParking: () => {},
  search: null,
  setSearch: () => {},
});

export default ParkingContext;
