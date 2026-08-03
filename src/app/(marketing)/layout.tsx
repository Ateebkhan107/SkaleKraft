import SimpleFooter from "@/components/layout/SimpleFooter";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <SimpleFooter />
    </>
  );
}
