"use client"
import { useUserDataContext } from "@/app/contexts/UserContex"
import React from "react"

const Page = () => {
  const { userData } = useUserDataContext()

  // Dette kommer ikke til å bli brukt egentlig, det skal være en pin code verifikasjon her.
  if (userData) {
    window.close()
  } else
    return (
      <>
        <div className="mb-20"></div>
        <main className="flex flex-col items-center min-h-screen p-4 sm:p-8">
          <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="mediumseagreen"
                  strokeLinecap="round"
                  strokeWidth="2"
                >
                  <rect
                    width="18"
                    height="14"
                    x="3"
                    y="5"
                    strokeDasharray="64"
                    strokeDashoffset="64"
                    rx="1"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.6s"
                      values="64;0"
                    />
                  </rect>
                  <path
                    strokeDasharray="24"
                    strokeDashoffset="24"
                    d="M3 6.5L12 12L21 6.5"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.6s"
                      dur="0.4s"
                      values="24;0"
                    />
                  </path>
                </g>
              </svg>
            </div>
            <h1 className="text-xl text-center">E-post er sendt</h1>
            <p className="text-center">
              Vi har nettopp sendt deg en e-post med en verifiseringslenke.
              Klikk på lenken for å logge inn.
            </p>
            <br />

            <p className="text-center">
              Har du ikke mottatt en e-post?{" "}
              <a href="#" className="text-blue-500">
                Klikk her for å sende en ny e-post
              </a>
            </p>
          </div>
        </main>
      </>
    )
}

export default Page
