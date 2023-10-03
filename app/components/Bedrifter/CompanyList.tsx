export default function CompanyList() {
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
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            Sopra Steria
                        </th>
                        <td className="px-6 py-4">OK</td>
                        <td className="px-6 py-4">Ingen</td>
                        <td className="px-6 py-4">123</td>
                        <td className="px-6 py-4">Intern interessant kommentar.</td>
                        <td className="px-6 py-4">
                            <a
                                href="#"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Endre
                            </a>
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            Sopra Steria
                        </th>
                        <td className="px-6 py-4">OK</td>
                        <td className="px-6 py-4">Ingen</td>
                        <td className="px-6 py-4">123</td>
                        <td className="px-6 py-4">Intern interessant kommentar.</td>
                        <td className="px-6 py-4">
                            <a
                                href="#"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Endre
                            </a>
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            Sopra Steria
                        </th>
                        <td className="px-6 py-4">OK</td>
                        <td className="px-6 py-4">Ingen</td>
                        <td className="px-6 py-4">123</td>
                        <td className="px-6 py-4">Intern interessant kommentar.</td>
                        <td className="px-6 py-4">
                            <a
                                href="#"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Endre
                            </a>
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            Sopra Steria
                        </th>
                        <td className="px-6 py-4">OK</td>
                        <td className="px-6 py-4">Ingen</td>
                        <td className="px-6 py-4">123</td>
                        <td className="px-6 py-4">Intern interessant kommentar.</td>
                        <td className="px-6 py-4">
                            <a
                                href="#"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Endre
                            </a>
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            Sopra Steria
                        </th>
                        <td className="px-6 py-4">OK</td>
                        <td className="px-6 py-4">Ingen</td>
                        <td className="px-6 py-4">123</td>
                        <td className="px-6 py-4">Intern interessant kommentar.</td>
                        <td className="px-6 py-4">
                            <a
                                href="#"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Endre
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}