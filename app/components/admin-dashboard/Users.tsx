"use client"
import React from "react"
import { Icon } from "@iconify/react"

const Users = ({ stats }: { stats: number }) => {
  return (
    <>
      <a
        href="/brukere"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Aktive brukere
        </h5>
        <div className="flex items-center ...">
          <Icon icon="mi:user" color="#009acd" width="100" />

          <p className="font-bold text-2xl text-gray-700 dark:text-gray-400 ml-7">
            {stats}
          </p>
        </div>
      </a>
    </>
  )
}

export default Users
