import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CONTROCOM — Controle sua TV pelo celular",
  description:
    "Transforme seu celular no controle remoto mais avançado do mundo. Compatível com Philips 43PFG5100/78, LG, Samsung e mais. Sistema ConsecomTV para pendrive.",
  keywords: [
    "controle remoto",
    "smart tv",
    "philips",
    "lg",
    "samsung",
    "controle tv",
    "app controle remoto",
    "consetv",
    "pendrive tv",
  ],
  authors: [{ name: "Wesley - WmAgência" }],
  openGraph: {
    title: "CONTROCOM — O controle remoto mais avançado do Brasil",
    description: "Controle sua Smart TV pelo celular. Funciona offline, online e via pendrive.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CONTROCOM",
    description: "Controle sua TV pelo celular",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
