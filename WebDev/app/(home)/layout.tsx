import React from 'react'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import LeftSidebar from '@/components/shared/Lefisidebar'
import Rightsidebar from '@/components/shared/Rightsidebar'
import Topbar from '@/components/shared/Topbar'
import Bottombar from '@/components/shared/Bottombar'
import { AuthProvider } from "../_app";
import Head from 'next/head';
import "@/styles/globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MyMedic',
  description: 'An application to facilitate medication knowledge and awareness'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
      <AuthProvider>
        <Topbar />
          <main className="flex flex-row">
            <LeftSidebar />

            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>

            {/* <Rightsidebar /> */}
          </main>
        <Bottombar />
        </AuthProvider>
      </body>
    </html>
  )
}
