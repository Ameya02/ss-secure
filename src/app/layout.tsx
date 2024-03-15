import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'
import { Provider } from '@/components/Provider'
import Navbar from '@/components/NavBar'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Secure Flod',
  description: 'Scan file,folders and urls for malware',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
        <Provider>
          {/* <Navbar /> */}
          <body className={`${inter.className} flex flex-col bg-gradient-to-r min-h-screen`}>{children}</body>
        </Provider>
        <Toaster />
      </html>
    </ClerkProvider>
  )
}
