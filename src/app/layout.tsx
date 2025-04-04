import { ReactNode } from 'react'
import Footer from '../components/Footer'
import { Metadata } from 'next'
import "../styles/globals.css";

export const metadata: Metadata = {
  title: 'NEIIST',
  description: 'Núcleo Estudantil de de Informática do Insituto Superior Técnico',
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}