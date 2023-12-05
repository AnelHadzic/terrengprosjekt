import { UserExistenceAndAgreement } from "@/app/lib/model/company/types/UserExistenceAndAgreement"
import { Result } from "@/app/types"

export async function userIsAuthenticated(email: string | null | undefined) {
  const apiUrl = `/api/v2/companies?email=${email}`
  console.log("Kjører userIsAuthenticated function")

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result = (await response.json()) as Result<UserExistenceAndAgreement>
    if (result.success) {
      if (
        result.data.emailExists ||
        result.data.agreement.agreementType != "NoAgreement"
      ) {
        console.log("Funksjonen ga true value, en bruker ble funnet")
        return true
      }
    } else {
      console.log("Funksjonen ga false value, en bruker ble ikke funnet")

      return false
    }
  } catch (error) {
    console.error("Error checking user:", error)
    return false
  }
}
