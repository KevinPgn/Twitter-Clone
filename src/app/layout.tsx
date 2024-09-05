import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { SessionProvider } from "next-auth/react";
import { SidebarRight } from "@/components/sidebarRight/SidebarRight";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className={"flex h-screen max-w-[1350px] gap-7 mx-auto " + inter.className}>
        <SessionProvider>
          <Sidebar />
          {children}
          <SidebarRight />
        </SessionProvider>
      </body>
    </html>
  );
}
