export default function CompanyHistory() {
  return (
    <>
      <div className="w-full text-center">
        <h1 className="text-2xl mb-3 font-bold leading-none text-gray-900 dark:text-white">
          Historikk
        </h1>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Dato
            </th>
            <th scope="col" className="px-6 py-3">
              Hendelse
            </th>
            <th scope="col" className="px-6 py-3">
              Utført av
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              06.10.2023
            </th>
            <td className="px-6 py-4">Endret kontaktperson.</td>
            <td className="px-6 py-4">mariusca@hiof.no</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              06.10.2023
            </th>
            <td className="px-6 py-4">
              Lang tekst for å forklare nøyaktig hva som skjedde med denne
              bedriften.
            </td>
            <td className="px-6 py-4">mariusca@hiof.no</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              06.10.2023
            </th>
            <td className="px-6 py-4">Bedriften ble opprettet</td>
            <td className="px-6 py-4">mariusca@hiof.no</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
