import '@/styles/globals.css'

export const metadata = {
  title: 'hargthreads',
  description: 'A web app that acts as a playground for my thoughts',
}

declare module 'react' {
  interface JSX {
    IntrinsicElements: {
      [key: string]: any;
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
