import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { DeveloperBadge } from "@/components/ui/developer-badge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enterprise Communication Platform Automated Paylaod Creator",
  description: "Payload Generator",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased` }
    >
      <body className="min-h-full flex flex-col">
         <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >       
        {children}
        <DeveloperBadge />
         </ThemeProvider>
        </body>
    </html>
  );
}
