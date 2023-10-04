import Activities from "@/app/components/admin-dashboard/Activities";
import Companies from "@/app/components/admin-dashboard/Companies";
import ParkingLots from "@/app/components/admin-dashboard/ParkingLots";
import Users from "@/app/components/admin-dashboard/Users";
import Sidebar from "@/app/components/shared/Sidebar";
import React from "react";

const Page = () => {
  return (
    <>
      <Sidebar />
      <main className="flex min-h-screen flex-col items-center">
        <div className="mb-6"></div>
        <div className="flex flex-row space-x-4 ...">
          <Users />
          <ParkingLots />
          <Companies />
        </div>
        <div className="mb-6"></div>
        <Activities />
      </main>
    </>
  );
};

export default Page;
