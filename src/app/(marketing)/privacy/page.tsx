import LegalPage from "@/components/legal/LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="August 3, 2026"
      intro="We only ask for what we need to talk about your project and keep the work moving."
      sections={[
        {
          heading: "Information We Collect",
          body: "We may collect your name, email, project details, budget range, and messages you send through the site or email.",
        },
        {
          heading: "How We Use It",
          body: "We use your information to reply, prepare proposals, manage projects, send invoices, and improve how we work with clients.",
        },
        {
          heading: "Sharing",
          body: "We do not sell your personal information. We may share necessary details with trusted tools or collaborators who help us deliver the project.",
        },
        {
          heading: "Storage",
          body: "We keep project and contact information only as long as it is useful for business, legal, accounting, or support reasons.",
        },
        {
          heading: "Your Choices",
          body: "You can ask us to update or delete your contact information, unless we need to keep it for legal or accounting records.",
        },
      ]}
    />
  );
}
