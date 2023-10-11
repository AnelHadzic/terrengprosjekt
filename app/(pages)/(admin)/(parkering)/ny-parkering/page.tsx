"use client";
import Sidebar from "@/app/components/shared/Sidebar";
import axios from "axios";
import React, { useState } from "react";

const Page = () => {
  const [parking, setParking] = useState<string>("");
  const [capacity, setCapacity] = useState<number>();

  // POLYGONER
  const [polygons, setPolygons] = useState<string[]>(["", "", "", ""]);

  // ERROR OG STATUS
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handlePolygonChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPolygons = [...polygons];
    newPolygons[index] = e.target.value;
    setPolygons(newPolygons);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedPolygons = polygons.map((coordinate) => {
      const [lat, lon] = coordinate.split(",").map(Number);
      return [lat, lon];
    });

    const payload = {
      parkingName: parking,
      parkingCapacity: capacity,
      parkingCoordinates: parsedPolygons,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/parkingLot",
        payload
      );
      console.log(response.data);

      setStatus("Parkering er nå lagt inn");
    } catch (error) {
      setError("Noe gikk galt");
    }
  };

  return (
    <>
      <div className="mb-6"></div>
      <main className="flex min-h-screen flex-col items-center">
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
              htmlFor="kapasitet"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Koordinater polygon 1
            </label>
            <p>Eksempel: 59.21241695508506, 10.920665509799544</p>
            <input
              type="text"
              id="koordinater1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => handlePolygonChange(e, 0)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="kapasitet"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Koordinater polygon 2
              <p>Eksempel: 59.211818145031586, 10.920678227484611</p>
            </label>
            <input
              type="text"
              id="koordinater2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => handlePolygonChange(e, 1)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="kapasitet"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Koordinater polygon 3
              <p>Eksempel: 59.211852077068144, 10.922339157147697</p>
            </label>
            <input
              type="text"
              id="koordinater3"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => handlePolygonChange(e, 2)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="kapasitet"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Koordinater polygon 4
              <p>Eksempel: 59.213619210517265, 10.924095429685895</p>
            </label>
            <input
              type="text"
              id="koordinater4"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => handlePolygonChange(e, 3)}
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </form>
      </main>
    </>
  );
};

export default Page;
