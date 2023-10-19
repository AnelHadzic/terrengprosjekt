import { useOnboardingContext } from "@/app/contexts/OnboardingProvider"
import React from "react"

const Oppsummering = () => {
  const { fornavn, etternavn, mobilnummer, regNumbers, brukerEmail } =
    useOnboardingContext()

  return (
    <>
      <h2 className="text-lg">Oppsummering</h2>
      <hr className="mb-3" />
      <p className="font-semibold mb-3">Email:</p>
      <p className="mb-3">{brukerEmail}</p>
      <p className="font-semibold mb-3">Fullt navn:</p>
      <p className="mb-3">
        {fornavn} {etternavn}
      </p>
      <hr className="mb-3" />
      <p className="font-semibold mb-3">Mobilnummer</p>
      <p className="mb-3">{mobilnummer}</p>
      <hr className="mb-3" />
      <p className="font-semibold mb-3">Bilregnummere</p>
      {regNumbers.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
      <div className="mb-3"></div>
    </>
  )
}

export default Oppsummering
