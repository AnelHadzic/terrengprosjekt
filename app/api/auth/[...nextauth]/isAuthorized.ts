import { Result } from "@/app/types"

export async function userIsAuthenticated(email: string | null | undefined) {
  const apiUrl = `http://localhost:3000/api/v2/companies?email=${email}`

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result = (await response.json()) as Result<UserExistenceAndAgreement>
    if (result.success) {
      if (result.data.emailExists || result.data.agreement.agreementType != "NoAgreement")
        return true
      } else {
        return false
      }
  } catch (error) {
    console.error("Error checking user:", error)
    return false
  }
}