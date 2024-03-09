import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: { default: "Spek", template: "%s | Spek" },
  description: "Simple public communities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="sm:justify-center">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
