import ContactFab from "@/components/shared/Contact-fab";
import Footer from "../../components/footer";
import Header from "../../components/shared/header";
import ScrollToTop from "@/components/shared/ScrollToTop";
import ClientLayout from "./layoutClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 ">
        <ClientLayout>{children}</ClientLayout>
      </main>
      <Footer />
      <ContactFab />
      <ScrollToTop />
    </div>
  );
}
