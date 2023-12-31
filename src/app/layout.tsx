import './globals.scss'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Providers } from "@/redux/provider";
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*  */}
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
