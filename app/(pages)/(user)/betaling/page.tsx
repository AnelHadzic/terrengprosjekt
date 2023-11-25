"use client"
import LinkButton from "@/app/components/shared/LinkButton"
import Table from "@/app/components/shared/Table"
import { useEffect, useState } from "react"

const Page = () => {
  const shouldPay = true
  const [tableRows, setTableRows] = useState<(string | JSX.Element)[][]>([])

  const tableColumns: string[] = [
    "Måned",
    "Dato betalt",
    "Betalings-metode",
    "Sum kr",
  ]

  useEffect(() => {
    const rowData: (string | JSX.Element)[][] = [
      ["Mars", "15.03.2023", "Vipps", "100"],
      ["April", "15.04.2023", "Vipps", "100"],
      ["Mai", "15.05.2023", "Vipps", "100"],
    ]

    setTableRows(rowData)
  }, [])

  return (
    <main className="flex flex-col items-center min-h-screen p-4 sm:p-8">
      <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Betaling
        </h1>
        <h2>Din status: </h2>
        {shouldPay ? (
          <>
            <p>Du har ikke betalt</p>
            <LinkButton route="/#">Trykk her for å gå til betaling.</LinkButton>
          </>
        ) : (
          <>
            <p>Du har betalt</p>
          </>
        )}

        <h2 className="mb-2 mt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Betalingshistorikk
        </h2>
        <Table
          columns={tableColumns}
          data={tableRows}
          showSearchField={true}
          showCheckboxInHeader={false}
          showCheckboxInRow={false}
          showPagination={true}
        ></Table>
      </div>
    </main>
  )
}

export default Page
