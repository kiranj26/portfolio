import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Kiran Jojare — Firmware Engineer",
  description:
    "6 years shipping firmware on bare metal — automotive, EV charging, industrial, space. STM32, ESP32, TI C2000, NXP S32K3, FreeRTOS.",
  openGraph: {
    title: "Kiran Jojare — Firmware Engineer",
    description: "Shipping firmware across 10+ silicon families: automotive, EV, industrial, space.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.ReactElement {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-zinc-950 text-zinc-100 antialiased font-sans min-h-screen">
        {children}
      </body>
    </html>
  )
}
