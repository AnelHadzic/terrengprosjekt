import { ICompany } from "@/app/lib/interface/ICompany"
import { Fragment } from "react"

type CompanyDetailsProps = {
  company: ICompany | undefined // Define the type of 'company' based on your data structure
  handleEditClick?: () => void
  handleDeleteClick?: () => void
}

export default function CompanyDetails(props: CompanyDetailsProps) {
  const { company, handleEditClick, handleDeleteClick } = props

  function handleEdit() {
    handleEditClick?.() 
  }

  function handleDelete() {
    handleDeleteClick?.() 
  }

  return (
    <>
      <div className="flex mb-6 items-center justify-between">
        <h1 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
          {company?.companyName}
        </h1>
        <button
          onClick={() => handleEdit()}
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Endre
        </button>
      </div>
      <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
        Kontaktperson
      </h2>
      <p className="mb-6">{company?.contactEmail}</p>
      {company?.companyAgreement ? (
        <>
          <h2 className="text-xl mb-2 font-bold leading-none text-gray-900 dark:text-white">
            Bedriftsavtale
          </h2>
          {Array.isArray(company.companyAgreement.domains) &&
          company.companyAgreement.domains.length > 0 ? (
            <div className="mb-6">
              <h3 className="text-l mb-2 font-bold leading-none text-gray-900 dark:text-white">
                Domener:
              </h3>
              {company.companyAgreement.domains.map((item, index) => (
                <Fragment key={index}>
                  <p>{item}</p>
                </Fragment>
              ))}
            </div>
          ) : null}
          {Array.isArray(company.companyAgreement.emails) &&
          company.companyAgreement.emails.length > 0 ? (
            <div className="mb-6">
              <h3 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                e-poster:
              </h3>
              {company.companyAgreement.emails.map((item, index) => (
                <Fragment key={index}>
                  <p>{item}</p>
                </Fragment>
              ))}
            </div>
          ) : null}
          <div className="mb-6"></div>
          {Array.isArray(company.companyAgreement.parkingSpots) &&
          company.companyAgreement.parkingSpots.length > 0 ? (
            <div className="mb-6">
              <p>Parkeringsplass: antall plasser</p>
              {company.companyAgreement.parkingSpots.map((item, index) => (
                <Fragment key={index}>
                  <p>
                    {item.parkingName}: {String(item.parkingLimit)}
                  </p>
                </Fragment>
              ))}
            </div>
          ) : null}
        </>
      ) : null}
      {company?.privateAgreement ? (
        <>
          <h2 className="text-xl mb-2 font-bold leading-none text-gray-900 dark:text-white">
            Privat avtale
          </h2>
          {Array.isArray(company.privateAgreement.domains) &&
          company.privateAgreement.domains.length > 0 ? (
            <div className="mb-6">
              <h3 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                Domener:
              </h3>
              {company.privateAgreement.domains.map((item, index) => (
                <Fragment key={index}>
                  <p>{item}</p>
                </Fragment>
              ))}
            </div>
          ) : null}
          {Array.isArray(company.privateAgreement.emails) &&
          company.privateAgreement.emails.length > 0 ? (
            <div className="mb-6">
              <h3 className="text-l font-bold leading-none text-gray-900 dark:text-white">
                e-poster:
              </h3>
              {company.privateAgreement.emails.map((item, index) => (
                <Fragment key={index}>
                  <p>{item}</p>
                </Fragment>
              ))}
            </div>
          ) : null}
          <h3 className="text-l font-bold leading-none text-gray-900 dark:text-white">
            Parkeringsplasser:
          </h3>
          {Array.isArray(company.privateAgreement.parkingSpots) &&
          company.privateAgreement.parkingSpots.length > 0 ? (
            <div className="mb-6">
              <p>Parkeringsplass: antall plasser</p>
              {company.privateAgreement.parkingSpots.map((item, index) => (
                <Fragment key={index}>
                  <p>
                    {item.parkingName}: {String(item.parkingLimit)}
                  </p>
                </Fragment>
              ))}
            </div>
          ) : null}
        </>
      ) : null}
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
      <h2 className="text-xl mb-1 font-bold leading-none text-gray-900 dark:text-white">
        Intern kommentar
      </h2>
      <p className="mb-6">{company?.internalComment}</p>

      <button
        onClick={() => handleDelete()}
        className="text-sm font-medium bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-red-300 hover:underline dark:bg-red-500 dark:hover:bg-red-600 dark:text-white"
      >
        Slett bedrift
      </button>
    </>
  )
}
