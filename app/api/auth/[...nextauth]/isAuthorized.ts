export async function isExistingUser(email: string | null | undefined) {
  const apiUrl = `http://localhost:3000/api/users/${email}`

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error("Error checking user:", error)
    return false
  }
}

export async function isCompanyUser(email: string | null | undefined) {
  const apiUrl = `http://localhost:3000/api/company/?email=${email}`

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status === 200) {
      const data = await response.json()
      const emailExists = data.emailExists
      return emailExists
    } else {
      return false
    }
  } catch (error) {
    console.error("Error checking user:", error)
    return false
  }
}
