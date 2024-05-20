import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'remixicon/fonts/remixicon.css'
import '@rainbow-me/rainbowkit/styles.css'
import { ContextProvider } from '@/ContextProvider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ABC LP Pool V2',
  description: 'ABC LP Pool V2 in Conflux.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>{children}</ContextProvider>
        <Toaster />
      </body>
    </html>
  )
}
