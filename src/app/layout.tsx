import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/Providers";

export const metadata: Metadata = {
  title: "AXYNTRAX Automation | Atlas",
  description: "Automatización Inteligente de última generación. Centro de comando Axyntrax y Atlas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
