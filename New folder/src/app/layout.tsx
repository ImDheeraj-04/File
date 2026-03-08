import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hermynee is Love – Part 2',
  description: 'A magical love story continues...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="stars" id="stars"></div>
        {children}
      </body>
    </html>
  )
}
