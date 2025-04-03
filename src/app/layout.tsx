import { ReactNode } from 'react'
import Footer from '../components/footer'

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
