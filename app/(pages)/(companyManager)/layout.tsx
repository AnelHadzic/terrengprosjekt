import CompanyManagerSidebar from "@/app/components/shared/CompanyManagerSidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Terreng Admin",
  description: "Adminside for terreng.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="w-1/6">
        <CompanyManagerSidebar></CompanyManagerSidebar>
      </div>

      <div className="w-5/6">{children}</div>
    </div>
    
  );
}
