"use client"
import React from "react"

export type StatsProps = {
  title: string
  icon: JSX.Element
  stats: number
  href: string
}

const StatsCard = (props: StatsProps) => {
  const { title, icon, stats, href } = props
  return (
    <>
      <a
        href={href}
        className="block min-w-[250px] max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <div className="flex items-center ...">
          {icon}
          <p className="font-bold text-2xl text-gray-700 dark:text-gray-400 ml-10">
            {stats}
          </p>
        </div>
      </a>
    </>
  )
}

export default StatsCard
