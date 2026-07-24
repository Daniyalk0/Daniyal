import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/Theme-provider";
import { VintageAssistant } from "./components/chat/ChatConcierge";
import { IntroProvider } from "./context/IntroContext";
import IntroOverlay from "./components/IntroOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daniyal Portfolio",
  description: "A portfolio showcasing the work of Daniyal, a full-stack developer specializing in modern web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
return (
     <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
        >
          <IntroProvider>

          <Navbar />

          <main className="flex-1">
            {children}
            <IntroOverlay/>
             {/* <VintageAssistant variant="mobile-persistent" /> */}
          </main>

          </IntroProvider>
          {/* Footer goes here */}
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
);
}
