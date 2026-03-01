import type { Metadata, Viewport } from "next"
import { Playfair_Display, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/context/providers"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "NDV Jewellers - Luxury Lab-Grown Diamonds",
  description:
    "Exquisite lab-grown diamond jewelry crafted with precision and elegance. Discover our exclusive collections.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3f0" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  colorScheme: "light",
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}