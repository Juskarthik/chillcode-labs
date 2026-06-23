import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Chillcode Labs — we vibe code your world into being",
  description:
    "Chillcode Labs is a small studio that vibe codes apps, websites, and tiny web apps for small businesses and dreamers. Neon dreams, shipped clean.",
  openGraph: {
    title: "Chillcode Labs",
    description: "We vibe code your world into being. Neon dreams, shipped clean.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0710",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        {/* runs before paint to set data-theme from storage / system,
            avoiding a flash of the wrong theme. Executes from the SSR'd
            HTML; the dev-only React notice about client re-render is benign. */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
          {/* atmospheric overlays */}
          <div className="fx-vignette" aria-hidden />
          <div className="fx-scanlines" aria-hidden />
          <div className="fx-grain" aria-hidden />
        </ThemeProvider>
      </body>
    </html>
  );
}
