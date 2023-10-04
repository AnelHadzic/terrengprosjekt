"use client";
import Sidebar from "@/app/components/shared/Sidebar";
import React from "react";
import { useRouter } from "next/navigation";
import ParkeringsListe from "@/app/components/parkering/ParkeringsListe";

const Page = () => {
  const router = useRouter();

  return (
    <>
      <Sidebar />
      <main className="flex min-h-screen flex-col items-center">
        <div className="mb-6"></div>
        <button
          onClick={() => router.push("/ny-parkering")}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Legg til bedrift
        </button>
        <div className="mb-6"></div>
        <ParkeringsListe />
      </main>
    </>
  );
};

export default Page;
