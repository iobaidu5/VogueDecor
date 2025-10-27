import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="overflow-hidden bg-white text-gray-900 xs:pt-24 md:pt-[120px]">
      <div className="mx-4 flex w-full items-center space-x-2 text-[13px] md:mx-16">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="font-[500]">Privacy Policy</span>
      </div>
      <div className="mx-auto max-w-4xl bg-white p-6 text-gray-800">
        <h1 className="mb-4 text-2xl font-bold text-red-700">PRIVACY POLICY</h1>
        <p className="mb-4 font-semibold">Effective Date: YYYY-MM-DD</p>

        <p className="mb-4">
          Welcome to the Vogue Decor website, vogue-decor.com (the “Website”). The Website and
          related online services (the “Services”) are operated by Vogue Decor (the “Company,” “we,”
          “us,” or “our”). We respect the privacy and security of your personal information
          (“Information”) and are committed to handling it responsibly. This Privacy Policy explains
          what Information we collect when you use the Services, how we use and share that
          Information, the legal grounds for processing where applicable, and the choices and rights
          available to you. Please read this Policy carefully.
        </p>

        <p className="mb-4">
          We may update or modify this Policy from time to time. Material changes will be posted on
          this page with an updated effective date; where practical and required by law, we will
          also notify you by email. By using or accessing the Services after changes are posted, you
          consent to the revised Policy.
        </p>

        <p className="mb-4">
          Note: Vogue Decor does not currently operate a mobile application. References to the
          “Services” in this Policy apply to the Website and our online and social media channels.
        </p>

        <p className="mb-6">
          If you have questions about this Policy or wish to exercise your privacy rights, please
          contact us at <a href="mailto:info@voguedecor.com" className="underline">info@voguedecor.com</a>.
        </p>

        <h2 className="mb-2 text-xl font-bold">Controller & Contact Information</h2>
        <ul className="list-disc pl-6 mb-6 text-sm">
          <li>Controller: Vogue Decor, legal entity: VOGUE DECOR INC.</li>
          <li>Privacy contact: <a href="mailto:info@voguedecor.com" className="underline">info@voguedecor.com</a></li>
          <li>Phone: +1 (888) 880-8232</li>
          <li>Addresses:
            <ul className="list-disc pl-6">
              <li>7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC H4T 1E7</li>
              <li>825 Denison St Unit 2, Markham, ON L3R 5E4</li>
            </ul>
          </li>
        </ul>

        <h2 className="mb-2 text-xl font-bold">Scope & Geographic Focus</h2>
        <p className="mb-6">
          This Policy applies to personal information collected through the Services and related
          customer interactions. The Policy is written with compliance to Canadian privacy rules in
          mind (including applicable provincial laws). If you are located outside Canada or the
          U.S., please note your information may be transferred.
        </p>

        <h2 className="mb-2 text-xl font-bold">Information We Collect</h2>
        <ul className="list-disc pl-6 mb-6 text-sm space-y-2">
          <li><strong>Identity & contact:</strong> name, company name (if applicable), email, phone number, billing & shipping addresses.</li>
          <li><strong>Account & credentials:</strong> username, hashed password, account settings.</li>
          <li><strong>Transaction data:</strong> order history, product selections, invoices, returns, warranty claims. Payment details are processed by third-party payment providers; we do not store full card numbers.</li>
          <li><strong>Technical & usage data:</strong> IP address, device/browser type, operating system, pages viewed, referring URLs, analytics and performance data.</li>
          <li><strong>Marketing & engagement:</strong> marketing preferences, email open/click data, newsletter opt-in status.</li>
          <li><strong>Customer support:</strong> correspondence with Customer Care, delivery instructions, warranty communications.</li>
          <li><strong>Third-party & public sources:</strong> information you post on social media (if you interact with us) and data from partners or public sources where permitted.</li>
        </ul>

        <h2 className="mb-2 text-xl font-bold">How We Use Your Information (Purposes)</h2>
        <ul className="list-disc pl-6 mb-6 text-sm space-y-2">
          <li>Process and fulfill orders, process payments, prepare invoices, arrange shipping/delivery, and handle returns and warranty claims.</li>
          <li>Provide customer service and respond to inquiries.</li>
          <li>Operate, evaluate, and improve the Services, including analytics, testing, and security.</li>
          <li>Send transactional communications (order confirmations, shipping notices) and, where you consent or permitted by law, marketing communications.</li>
          <li>Prevent, detect, and mitigate fraud and ensure payment and network security.</li>
          <li>Comply with legal obligations (tax, customs, accounting) and enforce our Terms of Service.</li>
        </ul>

        <h2 className="mb-2 text-xl font-bold">Legal Basis for Processing (Canada context)</h2>
        <ul className="list-disc pl-6 mb-6 text-sm space-y-2">
          <li><strong>Contract & performance:</strong> Processing necessary to perform a contract with you (e.g., order fulfillment).</li>
          <li><strong>Consent:</strong> Where required (e.g., marketing emails, non-essential cookies), we rely on your consent.</li>
          <li><strong>Legitimate interests:</strong> We may process data for our legitimate interests (e.g., fraud prevention, site improvements, direct marketing) provided your rights and interests are not overridden.</li>
          <li><strong>Legal compliance:</strong> Where required by law or to respond to lawful requests from authorities.</li>
        </ul>

        <h2 className="mb-2 text-xl font-bold">Cookies & Tracking Technologies</h2>
        <p className="mb-6">
          We use cookies, pixels, and similar technologies for site functionality, analytics, personalization, and marketing. You can manage cookie preferences via the cookie banner on our Website or through your browser settings. Our Cookie Policy (link) provides details on cookie types, duration, and third-party vendors, including Google Analytics, Facebook Pixel, Klaviyo.
        </p>

        <h2 className="mb-2 text-xl font-bold">Sharing & Disclosure</h2>
        <p className="mb-6">
          We share personal information as required to provide Services:
          <ul className="list-disc pl-6 mt-2">
            <li>Service providers / processors: payment processors, fulfillment and shipping carriers, hosting providers, email & CRM vendors, analytics/advertising partners.</li>
            <li>Professional advisors: legal, accounting, audit service providers.</li>
            <li>Law enforcement / legal requests: when required by law or to protect our rights.</li>
            <li>Business transfers: in connection with mergers, acquisitions, or asset sales; we will notify affected users where required.</li>
          </ul>
        </p>

        <h2 className="mb-2 text-xl font-bold">International Transfers</h2>
        <p className="mb-6">
          Personal information may be transferred to, processed, or stored in Canada, the United States, or other countries where our service providers operate. Where required, we use contractual safeguards or other appropriate measures to protect transfers.
        </p>

        <h2 className="mb-2 text-xl font-bold">Data Retention</h2>
        <p className="mb-6">
          We retain personal information only for as long as necessary to fulfill the purposes described (e.g., order fulfilment, warranty, tax accounting). Typical retention examples: transactional and accounting records retained for tax accounting periods (e.g., up to 7 years as required by law), marketing preferences retained until you unsubscribe, and account records retained while your account is active plus a reasonable period afterward.
        </p>

        <h2 className="mb-2 text-xl font-bold">Your Rights (Access, Correction, Deletion, etc.)</h2>
        <ul className="list-disc pl-6 mb-6 text-sm space-y-2">
          <li>Access a copy of your personal information.</li>
          <li>Correct or update inaccurate or incomplete information.</li>
          <li>Request deletion of your personal information (subject to legal exceptions).</li>
          <li>Restrict or object to certain processing.</li>
          <li>Withdraw consent where processing is based on consent.</li>
          <li>Receive a portable copy of your information in a structured format.</li>
        </ul>

        <p className="mb-6">
          To exercise rights, contact us at <a href="mailto:info@voguedecor.com" className="underline">info@voguedecor.com</a> or mail a request to our addresses above. We may require identity verification prior to fulfilling requests.
        </p>

        <h2 className="mb-2 text-xl font-bold">Marketing & Unsubscribe</h2>
        <p className="mb-6">
          We send marketing emails only to those who have opted in where required. Each marketing email includes an unsubscribe link. Please allow up to 3 business days for unsubscribe requests to be processed. You may also manage preferences via your account settings or by contacting Customer Care.
        </p>

        <h2 className="mb-2 text-xl font-bold">Security</h2>
        <p className="mb-6">
          We employ reasonable technical and organizational measures (encryption, access controls, secure hosting) to protect personal information. No online system is completely secure; if you suspect unauthorized access to your account or information, contact us immediately.
        </p>

        <h2 className="mb-2 text-xl font-bold">Children</h2>
        <p className="mb-6">
          Our Services are not directed to children under 16. We do not knowingly collect personal information from children under 16. If you believe we have collected such information, contact us to request deletion.
        </p>

        <h2 className="mb-2 text-xl font-bold">Changes to this Privacy Policy</h2>
        <p className="mb-6">
          We may update this Policy to reflect changes in practices, technology, or legal requirements. Material changes will be posted to this page with an updated Effective date. Continued use after posting constitutes acceptance.
        </p>

        <h2 className="mb-2 text-xl font-bold">Contact Us</h2>
        <p>
          To exercise rights or for privacy questions, contact:<br />
          Email: <a href="mailto:info@voguedecor.com" className="underline">info@voguedecor.com</a><br />
          Phone: +1 (888) 880 8232<br />
          Mail: Vogue Decor<br />
          7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC H4T 1E7<br />
          825 Denison St Unit 2, Markham, ON L3R 5E4
        </p>
      </div>
    </div>
  );
}
