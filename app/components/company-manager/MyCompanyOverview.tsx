import { ICompany } from "@/app/lib/interface/ICompany"
import { Fragment } from "react"

type CompanyDetailsProps = {
  loggedInUser:
    | {
        email: string
        firstname?: string
        lastname?: string
        phone?: string
        created?: Date
        token?: string
        role?: number
        company?: ICompany
        carRegNumbers?: string[]
        primaryCarRegNumber?: string
      }
    | undefined
}

export default function MyCompanyOverview(props: CompanyDetailsProps) {
  const { loggedInUser } = props

  return (
    <>
      <h1 className="text-2xl mb-2 font-bold leading-none text-gray-900 dark:text-white">
        {loggedInUser?.company?.companyName}
      </h1>
      <h2 className="text-xl mt-6 mb-2 font-bold leading-none text-gray-900 dark:text-white">
        Kontaktperson for bedriften
      </h2>
      <p className="mb-6">{loggedInUser?.company?.contactEmail}</p>
      <h2 className="text-xl mt-6 mb-2 font-bold leading-none text-gray-900 dark:text-white">
        Parkeringsplasser for ansatte med bedriftsavtale
      </h2>
      {Array.isArray(loggedInUser?.company?.companyAgreement?.parkingSpots) ? (
        <div className="mb-6">
          {loggedInUser?.company?.companyAgreement?.parkingSpots.map(
            (item, index) => (
              <Fragment key={index}>
                <p>
                  {item.parkingName}: {String(item.parkingLimit)}
                </p>
              </Fragment>
            ),
          )}
        </div>
      ) : (
        <p>Ingen parkeringer</p>
      )}

      <h2 className="text-xl mt-6 mb-2 font-bold leading-none text-gray-900 dark:text-white">
        Parkeringsplasser for ansatte med privatavtale
      </h2>
      {Array.isArray(loggedInUser?.company?.privateAgreement?.parkingSpots) ? (
        <div className="mb-6">
          {loggedInUser?.company?.privateAgreement?.parkingSpots.map(
            (item, index) => (
              <Fragment key={index}>
                <p>
                  {item.parkingName}: {String(item.parkingLimit)}
                </p>
              </Fragment>
            ),
          )}
        </div>
      ) : (
        <p>Ingen parkeringer</p>
      )}
    </>
  )
}
