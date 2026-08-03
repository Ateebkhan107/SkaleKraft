import LegalPage from "@/components/legal/LegalPage";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      updated="August 3, 2026"
      intro="These terms keep the work clear. By starting a project with SkaleKraft, you agree to the basics below."
      sections={[
        {
          heading: "Project Scope",
          body: "Every project starts with an agreed scope, timeline, and deliverables. If the direction changes, we will discuss the impact before adding work.",
        },
        {
          heading: "Payments",
          body: "Invoices are due according to the payment schedule in the proposal or invoice. Work may pause if a payment becomes overdue.",
        },
        {
          heading: "Client Content",
          body: "You are responsible for providing accurate copy, images, brand assets, and approvals. You confirm that you have the rights to anything you send us.",
        },
        {
          heading: "Ownership",
          body: "After final payment, you own the final approved work made specifically for your project. We may reuse general ideas, tools, code patterns, and internal systems.",
        },
        {
          heading: "Portfolio Use",
          body: "We may show completed work in our portfolio unless we agree otherwise in writing. Private or sensitive work can stay private.",
        },
      ]}
    />
  );
}
