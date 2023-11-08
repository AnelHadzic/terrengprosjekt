import { ICompany } from "@/app/lib/interface/ICompany"
import UserWithPopulatedCompany from "@/app/lib/model/user/types/UserWithPopulatedCompany"
import { Fragment } from "react"

type CompanyDetailsProps = {
  loggedInUser:
    | UserWithPopulatedCompany
    | undefined
}

export default function MyCompanyOverview(props: CompanyDetailsProps) {
  const { loggedInUser } = props

  return (
    <div className="pl-6">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mb-2 font-bold leading-none text-gray-900 dark:text-white">
          {loggedInUser?.company?.companyName}
        </h1>
        <h2 className="text-xl mt-6 mb-2 font-bold leading-none text-gray-900 dark:text-white">
          Kontaktperson for bedriften
        </h2>
        <p className="mb-6">{loggedInUser?.company?.contactEmail}</p>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        <div className="w-72 h-56 bg-blue-100 pl-8 shadow-md dark:bg-gray-800 dark:shadow-dark rounded-lg p-4">
          <h2 className="text-xl mt-6 mb-2 font-bold leading-none text-gray-900 dark:text-white">
            Bedriftsavtale
          </h2>
          {Array.isArray(
            loggedInUser?.company?.companyAgreement?.parkingSpots,
          ) ? (
            <div className="mb-6">
              <p className="mb-4">
                Status: <span className="font-bold text-green-500">Aktiv</span>
              </p>
              {loggedInUser?.company?.companyAgreement?.parkingSpots.map(
                (item, index) => (
                  <Fragment key={index}>
                    <p>
                      <span className="font-bold">{item.parkingName}</span>:{" "}
                      {String(item.parkingLimit) + " plasser"}
                    </p>
                  </Fragment>
                ),
              )}
            </div>
          ) : (
            <>
              <p className="mb-4">
                Status:{" "}
                <span className="font-bold text-red-500">Inaktiv</span>
              </p>
              <p>Ingen parkeringer</p>
            </>
          )}
        </div>

        <div className="w-72 h-56 pl-8 bg-purple-100 shadow-md dark:bg-gray-800 dark:shadow-dark rounded-lg p-4">
          <h2 className="text-xl mt-6 mb-2 font-bold leading-none text-gray-900 dark:text-white">
            Privatavtale
          </h2>
          {Array.isArray(
            loggedInUser?.company?.privateAgreement?.parkingSpots,
          ) ? (
            <div className="mb-6">
              <p className="mb-4">
                Status: <span className="font-bold text-green-500">Aktiv</span>
              </p>
              {loggedInUser?.company?.privateAgreement?.parkingSpots.map(
                (item, index) => (
                  <Fragment key={index}>
                    <p>
                      <span className="font-bold">{item.parkingName}</span>:{" "}
                      {String(item.parkingLimit) + " plasser"}
                    </p>
                  </Fragment>
                ),
              )}
            </div>
          ) : (
            <>
              <p className="mb-4">
                Status:{" "}
                <span className="font-bold text-red-500">Inaktiv</span>
              </p>
              <p>Ingen parkeringer</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
