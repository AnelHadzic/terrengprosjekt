"use client";
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

type ParkingLot = {
  parkingName: string;
  parkingCapacity: number;
};

const ParkeringsListe = () => {
  const [parkingList, setParkingList] = useState<ParkingLot[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = "http://localhost:3000/api/parkingLot";
        const response = await axios.get(API_URL);
        setParkingList(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            </tr>
          </thead>
          <tbody>
            {parkingList.map((item, index) => (
              <Fragment key={index}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.parkingName}
                  </th>
                  <td className="px-6 py-4">{item.parkingCapacity}</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ParkeringsListe;
