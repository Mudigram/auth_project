import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Auth App",
  description: "Auth demo (Next.js + shadcn)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
