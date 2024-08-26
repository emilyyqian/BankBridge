import type { Metadata } from "next";
import { Arimo, Libre_Caslon_Text} from "next/font/google";
import "./globals.css";

const arimo = Arimo({
  subsets: ["latin"], 
  variable: '--font-arimo',
  weight: ["400", "600"]
});
const libreCaslonText = Libre_Caslon_Text({
  subsets: ['latin'],
  variable: '--font-libre-caslon-text',
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "BankBridge",
  description: "BankBridge is your all-in-one banking platform, streamlining your financial management with a unified dashboard for multi-account connectivity, real-time transactions, and seamless money transfers.",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${arimo.variable} ${libreCaslonText.variable}`}>{children}</body>
    </html>
  );
}
