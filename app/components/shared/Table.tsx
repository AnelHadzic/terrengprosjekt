import React from "react"

import SearchField from "./SearchField"
import TableCheckboxHeader from "./TableCheckbox"
import TableCheckBoxRow from "./TableCheckBoxRow"
import TablePagination from "./TablePagination"

type TableProps = {
  columns: string[]
  data: (string | number | undefined | React.ReactNode | JSX.Element)[][]
  children?: React.ReactNode
  showSearchField: boolean
  showCheckboxInHeader: boolean
  showCheckboxInRow: boolean
  showPagination: boolean
}

export default function Table({
  columns,
  data,
  children,
  showSearchField,
  showCheckboxInHeader,
  showCheckboxInRow,
  showPagination,
}: TableProps) {
  return (
    <section className="relative overflow-x-auto p-3 sm:rounded-lg">
      {showSearchField && <SearchField />}
      <div className="block sm:hidden">
        {/* Render for smaller screens */}
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {showCheckboxInHeader && <TableCheckboxHeader />}
              {columns.map((column, index) => (
                <th key={index} scope="col" className="px-2 py-2">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {showCheckboxInRow && <TableCheckBoxRow />}
                {row.map((cell, index) => (
                  <td key={index} className="px-2 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="hidden sm:block">
        {/* Render for larger screens */}
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {showCheckboxInHeader && <TableCheckboxHeader />}
              {columns.map((column, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {showCheckboxInRow && <TableCheckBoxRow />}
                {row.map((cell, index) => (
                  <td key={index} className="px-6 py-4">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="flex-column flex flex-wrap items-center justify-between pt-7 md:flex-row">
        {children}
        {showPagination && <TablePagination />}
      </section>
    </section>
  )
}

//Table Inspirert fra:
//Flowbite(u.å). Tailwind CSS Table - Flowbite
//https://flowbite.com/docs/components/tables/
