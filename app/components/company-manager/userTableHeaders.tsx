export function userTableHeaders() {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          E-post
        </th>
        <th scope="col" className="px-6 py-3">
          Bedrift
        </th>
        <th scope="col" className="px-6 py-3">
          Mobilnummer
        </th>
        <th scope="col" className="px-6 py-3">
          Bil regnr.
        </th>
        <th scope="col" className="px-6 py-3">
          Aktiv parkering
        </th>
      </tr>
    </thead>
  );
}
