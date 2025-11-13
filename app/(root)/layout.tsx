import ContactFab from "@/components/shared/Contact-fab";
import Footer from "../../components/footer";
import Header from "../../components/shared/header";
import ScrollToTop from "@/components/shared/ScrollToTop";
import ClientLayout from "./layoutClient";
import GoldTicker from "@/components/GoldTicker";
import MobileNavBar from "@/components/shared/MobileNavBar";
import { CartSheetProvider } from "@/components/shared/header/cart-sheet-context";

export default function RootLayout({
  children,
  cart,
}: Readonly<{
  children: React.ReactNode;
  cart: React.ReactNode;
}>) {
  return (
    <CartSheetProvider>
      <div className="flex h-screen flex-col">
        <GoldTicker />
        <Header />
        <main className="flex-1 ">
          <ClientLayout>{children}</ClientLayout>
        </main>
        {cart}
        <Footer />
        {/* <ContactFab /> */}
        <ScrollToTop />
        <MobileNavBar />
      </div>
    </CartSheetProvider>
  );
}
