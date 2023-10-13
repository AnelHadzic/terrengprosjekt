"use client"
import Activities from "@/app/components/admin-dashboard/Activities"
import React, { useState, useEffect } from "react"
import { getStatistics } from "./getStatistics"
import { Icon } from "@iconify/react"
import StatsCard from "@/app/components/admin-dashboard/StatsCard"

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

  const userIcon = <Icon icon="mi:user" color="#009acd" width="100" />
  const parkingIcon = (
    <Icon icon="lucide:parking-circle" color="mediumpurple" width="100" />
  )
  const companyIcon = (
    <Icon icon="ic:baseline-business-center" color="orange" width="100" />
  )

  return (
    <>
      <main className="flex min-h-screen flex-col items-center">
        <div className="mb-6"></div>
        <div className="flex flex-row space-x-4 ...">
          <StatsCard
            title="Aktive brukere"
            icon={userIcon}
            stats={stats.users}
            href="/brukere"
          />
          <StatsCard
            title="Parkeringsplasser"
            icon={parkingIcon}
            stats={stats.parkingLots}
            href="/parkeringsplasser"
          />
          <StatsCard
            title="Aktive bedrifter"
            icon={companyIcon}
            stats={stats.companies}
            href="/bedrifter"
          />
        </div>
        <div className="mb-6"></div>
        <Activities />
      </main>
    </>
  )
}

export default Page
