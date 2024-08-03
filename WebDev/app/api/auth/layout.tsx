import "@/styles/index.css";
import '@/styles/globals.css';

import { ThemeProvider } from "next-themes";
export const metadata = {
  title: 'MyMedic',
  description: 'Prescription analysis tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ThemeProvider attribute="class">
        <div>
          <main>{children}</main>
        </div>
      </ThemeProvider>
  )
}
