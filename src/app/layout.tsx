import { ReactNode } from 'react'
import Footer from '../components/Footer';
import NavBar from '../components/Navbar';
import { Metadata } from 'next'
import { UserDataProvider } from '../context/UserDataContext';
import "../styles/globals.css";

export const metadata: Metadata = {
  title: 'NEIIST',
  description: 'Núcleo Estudantil de de Informática do Insituto Superior Técnico',
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserDataProvider>
          <NavBar />
            <main>{children}</main>
          <Footer />
        </UserDataProvider>
      </body>
    </html>
  )
}