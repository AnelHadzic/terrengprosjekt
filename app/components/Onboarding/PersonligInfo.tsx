import { useOnboardingContext } from "@/app/contexts/OnboardingProvider"

const PersonligInfo = () => {
  const {
    fornavn,
    setFornavn,
    etternavn,
    setEtternavn,
    mobilnummer,
    setMobilnummer,
  } = useOnboardingContext()

  return (
    <>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Fornavn
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Ole"
          required
          value={fornavn}
          onChange={(e) => setFornavn(e.target.value)}
        />
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Etternavn
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Olsen"
          required
          value={etternavn}
          onChange={(e) => setEtternavn(e.target.value)}
        />
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Mobilnummer
        </label>
        <input
          type="number"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="90000000"
          required
          value={mobilnummer ?? ""}
          onChange={(e) => setMobilnummer(parseInt(e.target.value))}
        />
      </div>
    </>
  )
}

export default PersonligInfo
