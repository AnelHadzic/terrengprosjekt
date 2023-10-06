import Image from "next/image";

export default function SingleCompany() {
    return (
        <div className="w-full p-6 mt-6 pb-12 flex">
            {/* Details */}
            <div className="w-1/3 pl-14 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h1 className="text-xl mb-6 font-bold leading-none text-gray-900 dark:text-white">
                    Sopra Steria
                </h1>
                <h2 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                    Kontaktperson
                </h2>
                <p className="mb-6">bossman@sopra.no</p>

                <h2 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                    Bedriftsavtale
                </h2>
                <p className="mb-6">E-poster: person@sopra.no</p>

                <h2 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                    Privat avtale
                </h2>
                <p className="mb-6">Domener: sopra.no</p>

                <div className="flex items-center justify-between">
                    <h2 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                        Antall brukere
                    </h2>
                    <a
                        href="#"
                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                        Se alle
                    </a>
                </div>
                <p className="mb-6">85</p>
            </div>

            {/* History */}
            <div className="w-2/3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
                            <td className="px-6 py-4">
                                Endret kontaktperson.
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
                            <td className="px-6 py-4">
                                Lang tekst for å forklare nøyaktig hva som
                                skjedde med denne bedriften.
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
                            <td className="px-6 py-4">
                                Bedriften ble opprettet
                            </td>
                            <td className="px-6 py-4">mariusca@hiof.no</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
