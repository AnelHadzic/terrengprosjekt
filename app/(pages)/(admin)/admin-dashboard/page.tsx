"use client"
import Activities from "@/app/components/admin-dashboard/Activities"
import Companies from "@/app/components/admin-dashboard/Companies"
import ParkingLots from "@/app/components/admin-dashboard/ParkingLots"
import Users from "@/app/components/admin-dashboard/Users"
import React, { useState, useEffect } from "react"
import { getStatistics } from "./getStatistics"

interface Stats {
  users: number
  parkingLots: number
  companies: number
}

const Page = () => {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    parkingLots: 0,
    companies: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedStats = await getStatistics()
        setStats(fetchedStats)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        <div className="mb-6"></div>
        <div className="flex flex-row space-x-4 ...">
          <Users stats={stats.users} />
          <ParkingLots stats={stats.parkingLots} />
          <Companies stats={stats.companies} />
        </div>
        <div className="mb-6"></div>
        <Activities />
      </main>
    </>
  )
}

export default Page
