import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import FloatingChatbot from "@/components/ui/FloatingChatbot";

export const metadata: Metadata = {
  title: "EPSI Admin Platform",
  description: "Plateforme de pilotage administratif et pédagogique EPSI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="flex min-h-screen bg-background">
          <Sidebar />
          <main className="flex-1 min-w-0 ml-60 transition-all duration-300">
            {children}
          </main>
          <FloatingChatbot />
        </div>
      </body>
    </html>
  );
}
