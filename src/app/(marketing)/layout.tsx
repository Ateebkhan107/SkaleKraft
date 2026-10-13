import Navbar from "@/components/layout/Navbar";
import SimpleFooter from "@/components/layout/SimpleFooter";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <SimpleFooter />
    </>
  );
}
