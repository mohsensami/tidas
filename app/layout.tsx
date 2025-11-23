import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/fonts.css";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "../lib/constants";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { CartSheetProvider } from "@/components/shared/header/cart-sheet-context";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    template: `%s | تیداس`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
  cart,
}: Readonly<{
  children: React.ReactNode;
  cart: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body

      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartSheetProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
            {cart}
          </ThemeProvider>
        </CartSheetProvider>
      </body>
      {/* <Script id="goftino-widget" strategy="afterInteractive">
        {`
          !function(){
            var i="upytyh",a=window,d=document;
            function g(){
              var g=d.createElement("script"),
                  s="https://www.goftino.com/widget/"+i,
                  l=localStorage.getItem("goftino_"+i);
              g.async=!0;
              g.src=l ? s+"?o="+l : s;
              d.getElementsByTagName("head")[0].appendChild(g);
            }
            "complete"===d.readyState ? g() : a.attachEvent ? a.attachEvent("onload",g) : a.addEventListener("load",g,!1);
          }();
        `}
      </Script> */}
    </html>
  );
}
