import type { Metadata } from "next";
import { Rubik, Libre_Caslon_Text} from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"], 
  variable: '--font-rubik',
  weight: ["400", "500"]
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
      <body className={`${rubik.variable} ${libreCaslonText.variable}`}>{children}</body>
    </html>
  );
}
