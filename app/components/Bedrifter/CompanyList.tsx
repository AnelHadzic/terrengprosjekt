"use client";
import { ICompany } from "@/app/lib/interface/ICompany";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

export default function CompanyList() {
  const [companyList, setCompanyList] = useState<ICompany[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = "http://localhost:3000/api/company";
        const response = await axios.get(API_URL);
        console.log(response.data.data);
        setCompanyList(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Bedriftnavn
            </th>
            <th scope="col" className="px-6 py-3">
              Bedriftavtale status
            </th>
            <th scope="col" className="px-6 py-3">
              Privatavtale status
            </th>
            <th scope="col" className="px-6 py-3">
              Brukere
            </th>
            <th scope="col" className="px-6 py-3">
              Interne kommentarer
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {companyList.map((item, index) => (
            <Fragment key={index}>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.companyName}
                </th>
                <td className="px-6 py-4">
                  {item.companyAgreement ? "OK" : "Ingen avtale"}
                </td>
                <td className="px-6 py-4">
                  {item.privateAgreement ? "OK" : "Ingen avtale"}
                </td>
                <td className="px-6 py-4">{"123"}</td>
                <td className="px-6 py-4">{item.internalComment}</td>
                <td className="px-6 py-4">{"Edit"}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}