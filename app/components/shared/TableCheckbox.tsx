export default function TableCheckboxHeader() {
  return (
    <th scope="col" className="p-4">
      <div className="flex items-center">
        <input
          id="checkbox-all-search"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
        />
        <label htmlFor="checkbox-all-search" className="sr-only">
          checkbox
        </label>
      </div>
    </th>
  )
}
