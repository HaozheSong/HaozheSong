import './global.css'
import Header from './Header'

export const metadata = {
  title: 'Haozhe Song'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
