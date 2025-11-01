import ContactFab from "@/components/shared/Contact-fab";
import Footer from "../../components/footer";
import Header from "../../components/shared/header";
import ScrollToTop from "@/components/shared/ScrollToTop";
import ClientLayout from "./layoutClient";
import GoldTicker from "@/components/GoldTicker";
import MobileNavBar from "@/components/shared/MobileNavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <GoldTicker />
      <Header />
      <main className="flex-1 ">
        <ClientLayout>{children}</ClientLayout>
      </main>
      <Footer />
      {/* <ContactFab /> */}
      <ScrollToTop />
      <MobileNavBar />
    </div>
  );
}
