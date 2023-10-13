import axios from "axios"

export const getStatistics = async () => {
  const userAPI = "http://localhost:3000/api/users"
  const parkingLotAPI = "http://localhost:3000/api/parkingLot"
  const companyAPI = "http://localhost:3000/api/company"

  try {
    const [userRes, parkingLotRes, companyRes] = await Promise.all([
      axios.get(userAPI),
      axios.get(parkingLotAPI),
      axios.get(companyAPI),
    ])

    const users = userRes.data.data.length
    const parkingLots = parkingLotRes.data.data.length
    const companies = companyRes.data.data.length

    return { users, parkingLots, companies }
  } catch (err) {
    console.error("Error fetching statistics:", err)
    return { users: 0, parkingLots: 0, companies: 0 }
  }
}
