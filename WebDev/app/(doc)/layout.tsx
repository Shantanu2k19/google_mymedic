import React from 'react'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import DocLeftSidebar from '@/components/shared/DocLeftsidebar'
//import Rightsidebar from '@/components/shared/Rightsidebar'
import Topbar from '@/components/shared/Topbar'
import Bottombar from '@/components/shared/DocBottombar'
import { AuthProvider } from "../_app";
import Head from 'next/head';
import "@/styles/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <DocLeftSidebar />

            <section className="main-container">
              <div className="w-full">
                <ToastContainer
                  position="top-center"
                  pauseOnFocusLoss={false}
                  pauseOnHover={false}
                  limit={3}
                  theme="dark"
                  // className="custom-toast-container"
                />
                {children}
              </div>
            </section>

          </main>
        <Bottombar />
        </AuthProvider>
      </body>
    </html>
  )
}
