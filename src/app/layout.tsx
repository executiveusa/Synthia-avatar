import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import FireFliesBackground from "@/components/FireFliesBackground";
import HomeBtn from "@/components/HomeButton";
import Sound from "@/components/Sound";
import Footer from "@/components/Footer";
import InviteOnlyModal from "@/components/InviteOnlyModal";
import { AvatarProvider } from "@/context/AvatarContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Agent Alex | Kupuri Media",
  description:
    "AI Agent Alex — Powered by Synthia 3.0™, created by Ivette Milo. Kupuri Media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={clsx(
          inter.variable,
          dancingScript.variable,
          "bg-background text-foreground font-inter"
        )}
      >
        <AvatarProvider>
          <HomeBtn />
          {children}
          <FireFliesBackground />
          <Sound />
          <Footer />
          <InviteOnlyModal />
          <div id="my-modal"></div>
        </AvatarProvider>
      </body>
    </html>
  );
}
