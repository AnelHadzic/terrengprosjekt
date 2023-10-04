"use client";
import ParkeringsListe from "@/app/components/parkering/ParkeringsListe";
import axios from "axios";
import React, { useState } from "react";

const Page = () => {
  const [parking, setParking] = useState<string>("");
  const [capacity, setCapacity] = useState<number>();
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const payload = {
      parkingName: parking,
      parkingCapacity: capacity,
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
      <main className="flex min-h-screen flex-col items-center">
        {status ?? status}
        {error ?? error}
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
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Kapasitet
            </label>
            <input
              type="number"
              id="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setCapacity(parseInt(e.target.value))}
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
        <ParkeringsListe />
      </main>
    </>
  );
};

export default Page;
