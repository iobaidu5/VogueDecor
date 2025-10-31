"use client";

import BreadCrumb from 'components/breadCrum';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const tabs = [
  {
    id: 'terms',
    label: 'Terms',
    content: (
      <>
        <p className='text-xs'><strong>VOGUE DECOR</strong></p>
        <p className='text-xs'><strong>Effective Date:</strong> 2025-10-01</p>

        <h2 className="font-semibold text-sm mt-4">1. Acceptance of Terms</h2>
        <p className='text-xs'>
          Welcome to the Vogue Decor website, <strong>vogue-decor.com</strong> (the “Site”). The Site is operated by Vogue Decor (the “Company,” “we,” “us,” or “our”). Each person who accesses and/or uses the Site (each a “User,” “you,” or “your”) should read these Terms of Service (“Terms”) carefully before using the Site. By accessing or using the Site, you signify that you have read, understand, and agree to be bound by these Terms, whether or not you are a registered user.
        </p>
        <p className='text-xs'><strong>IF YOU DO NOT AGREE TO THESE TERMS, PLEASE DO NOT USE THE PLATFORM.</strong></p>
        <p className='text-xs'>
          We may update these Terms at any time by posting the amended Terms on the Site; such changes will be effective once posted. Your continued access to or use of the Site after changes are posted constitutes your acceptance of the updated Terms. We may add, remove or change Site features at any time without prior notice.
        </p>
        <p className='text-xs'>No mobile app is available at this time. The Company maintains Site and social media platforms only.</p>

        <h2 className="font-semibold text-sm mt-4">2. Account Registration & Security</h2>
        <p className='text-xs'>
          You may create an account to speed checkout and store addresses. Keep your credentials confidential. You are responsible for all activity under your account. Log out when using a public computer and notify Customer Care immediately if you suspect unauthorized access.
        </p>

        <h2 className="font-semibold text-sm mt-4">3. Orders & Contract Formation</h2>
        <p className='text-xs'>
          Placing an order on the Site is an offer to purchase the listed goods. We will acknowledge receipt by email. A binding contract is formed only when we send an order confirmation or dispatch notice. We reserve the right to cancel or refuse orders for any reason, including pricing or inventory errors.
        </p>

        <h2 className="font-semibold text-sm mt-4">4. Pricing & Payment</h2>
        <p className='text-xs'>
          Prices on the Site are listed in CAD unless otherwise noted and exclude applicable taxes and shipping fees unless explicitly stated. Final taxes and shipping are calculated at checkout. We accept the payment methods displayed at checkout. If a pricing error is identified, we may cancel the order and refund any amounts already paid.
        </p>

        <h2 className="font-semibold text-sm mt-4">5. Shipping & Pickup (summary)</h2>
        <p className='text-xs'><strong>Free shipping promotion:</strong> FREE SHIPPING ON ORDERS OVER $2,999 WITHIN CANADA (promotion).</p>
        <p className='text-xs'><strong>Delivery & Transit:</strong> Typical carrier transit times (business days):</p>
        <ul className="list-none pl-6">
          <li className='text-xs'>Ontario & Quebec: 1–3</li>
          <li className='text-xs'>Alberta: 3–7</li>
          <li className='text-xs'>British Columbia: 5–9</li>
        </ul>
        <p className='text-xs'>Transit times are estimates and may vary.</p>
        <p className='text-xs'>
          <strong>Pickup:</strong> Available at Montreal (7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC) and Toronto (825 Denison St Unit 2, Markham, ON). Toronto pickup may require 2 business days’ notice.
        </p>
        <p className='text-xs'>
          <strong>Oversized / Freight items:</strong> Large or palletized items may ship via freight/LTL or white-glove carriers and may incur additional fees. We will notify you before shipping if freight arrangements or additional charges apply.
        </p>
        <p className='text-xs'>
          <strong>Shipping costs & title:</strong> Shipping costs vary by item and destination; final shipping is shown at checkout. Title and risk of loss pass in accordance with the Shipping Policy (see link below).
        </p>
        <p className='text-xs'>See our full Shipping Policy: <em>Link</em></p>

        <h2 className="font-semibold text-sm mt-4">6. Returns, Cancellations & Refunds</h2>
        <p className='text-xs'>
          Returns and exchanges are governed by our Returns Policy: <em>Link</em>. Standard returns window: 14 days from delivery for eligible items, unless a different period is stated at purchase. Custom or commercial orders may be non-returnable or subject to special cancellation terms disclosed at order confirmation. Refunds are issued to the original payment method once the returned goods are received and inspected.
        </p>

        <h2 className="font-semibold text-sm mt-4">7. Warranty & Product Care</h2>
        <p className='text-xs'>
          We warrant our goods to be free from manufacturing defects for the warranty period shown on the product page. If no period is specified, the default warranty is 12 months from delivery. Normal wear and tear, misuse, accidental damage, or modifications are not covered. Warranty remedies are limited to repair, replacement, or refund at our option. Contact Customer Care for more info.
        </p>

        <h2 className="font-semibold text-sm mt-4">8. Limitation of Liability & Indemnity</h2>
        <p className='text-xs'>
          To the maximum extent permitted by law, our liability for any claim arising from your purchase or use of products is limited to the purchase price of the affected goods. We are not liable for indirect, incidental, special, consequential, or punitive damages. You agree to indemnify and hold Vogue Decor harmless from claims arising from your misuse of products or breach of these Terms.
        </p>

        <h2 className="font-semibold text-sm mt-4">9. Intellectual Property</h2>
        <p className='text-xs'>
          All Site content, text, images, designs, trademarks, and code are owned or licensed by Vogue Decor. You may not reproduce, distribute, or create derivative works from our content without prior written permission.
        </p>

        <h2 className="font-semibold text-sm mt-4">10. Privacy & Cookies</h2>
        <p className='text-xs'>
          Our Privacy Policy explains how we collect and use personal data. By using the Site you consent to our collection and processing of data as described in the Privacy Policy: /privacy (link).
        </p>

        <h2 className="font-semibold text-sm mt-4">11. Governing Law & Dispute Resolution</h2>
        <p className='text-xs'>
          These Terms are governed by the laws of the Province of Québec and the federal laws of Canada applicable therein.
        </p>

        <h2 className="font-semibold text-sm mt-4">12. Language (Québec)</h2>
        <p className='text-xs'>
          If you are a consumer in the Province of Québec, you may request a French version of these Terms. An official French version is available on request and will be posted on the Site.
        </p>

        <h2 className="font-semibold text-sm mt-4">13. Changes to Terms</h2>
        <p className='text-xs'>
          We may update these Terms; material changes will be posted here with an updated Effective Date.
        </p>

        <h2 className="font-semibold text-sm mt-4">14. Contact & Questions</h2>
        <p className='text-xs'>Customer Care: +1 (888) 880-8232</p>
        <p className='text-xs'>Email: info@voguedecor.com</p>
        <p className='text-xs'>Mailing addresses: 7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC H4T 1E7</p>
      </>
    )
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    content: (
      <>
        <p className='text-xs'><strong>VOGUE DECOR</strong></p>
        <p className='text-xs'><strong>Effective Date:</strong> 2025-10-01</p>
  
        <h2 className="font-semibold text-sm mt-4">1. Introduction</h2>
        <p className='text-xs'>
          Welcome to the Vogue Decor website, <strong>vogue-decor.com</strong> (the “Website”). The Website and related online services (the “Services”) are operated by Vogue Decor (the “Company,” “we,” “us,” or “our”). 
          We respect the privacy and security of your personal information (“Information”) and are committed to handling it responsibly.
        </p>
        <p className='text-xs'>
          This Privacy Policy explains what Information we collect when you use the Services, how we use and share that Information, the legal grounds for processing where applicable, and the choices and rights available to you.
        </p>
        <p className='text-xs'>
          We may update this Policy from time to time. Material changes will be posted here with an updated effective date; where required by law, we’ll notify you by email. By using the Services after updates are posted, you consent to the revised Policy.
        </p>
        <p className='text-xs'><strong>Note:</strong> Vogue Decor does not currently operate a mobile app. “Services” refers to our website and online/social media channels.</p>
  
        <h2 className="font-semibold text-sm mt-4">2. Controller & Contact Information</h2>
        <p className='text-xs'><strong>Controller:</strong> Vogue Decor Inc.</p>
        <p className='text-xs'><strong>Privacy contact:</strong> info@voguedecor.com</p>
        <p className='text-xs'><strong>Phone:</strong> +1 (888) 880-8232</p>
        <p className='text-xs'>
          <strong>Addresses:</strong><br />
          7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC H4T 1E7<br />
          825 Denison St Unit 2, Markham, ON L3R 5E4
        </p>
  
        <h2 className="font-semibold text-sm mt-4">3. Scope & Geographic Focus</h2>
        <p className='text-xs'>
          This Policy applies to personal information collected through the Services and related customer interactions. It is written to comply with Canadian privacy laws. 
          If you are located outside Canada or the U.S., your information may be transferred to these regions.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">4. Information We Collect</h2>
        <ul className="list-none pl-6">
          <li className='text-xs'>Identity & contact: name, company name, email, phone, billing & shipping addresses.</li>
          <li className='text-xs'>Account & credentials: username, hashed password, account settings.</li>
          <li className='text-xs'>Transaction data: order history, invoices, returns, warranty claims.</li>
          <li className='text-xs'>Technical & usage data: IP address, browser, device, analytics data.</li>
          <li className='text-xs'>Marketing & engagement: preferences, email activity, opt-in status.</li>
          <li className='text-xs'>Customer support: communications, delivery notes, warranty info.</li>
          <li className='text-xs'>Third-party & public sources: social media or partners (where permitted).</li>
        </ul>
  
        <h2 className="font-semibold text-sm mt-4">5. How We Use Your Information</h2>
        <ul className="list-none pl-6">
          <li className='text-xs'>To process orders, payments, shipping, and returns.</li>
          <li className='text-xs'>To provide customer service and respond to inquiries.</li>
          <li className='text-xs'>To operate, improve, and secure the Website and Services.</li>
          <li className='text-xs'>To send order confirmations and, where permitted, marketing emails.</li>
          <li className='text-xs'>To prevent fraud and comply with legal obligations.</li>
        </ul>
  
        <h2 className="font-semibold text-sm mt-4">6. Legal Basis for Processing</h2>
        <ul className="list-none pl-6">
          <li className='text-xs'><strong>Contract & performance:</strong> To fulfill your purchases.</li>
          <li className='text-xs'><strong>Consent:</strong> For optional marketing or cookies.</li>
          <li className='text-xs'><strong>Legitimate interests:</strong> For security, analytics, and service improvement.</li>
          <li className='text-xs'><strong>Legal compliance:</strong> For record-keeping and legal requests.</li>
        </ul>
  
        <h2 className="font-semibold text-sm mt-4">7. Cookies & Tracking Technologies</h2>
        <p className='text-xs'>
          We use cookies and similar tools for functionality, analytics, and marketing. You can manage cookie preferences via the cookie banner or your browser. 
          See our Cookie Policy for details about vendors such as Google Analytics, Facebook Pixel, and Klaviyo.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">8. Sharing & Disclosure</h2>
        <ul className="list-none pl-6">
          <li className='text-xs'>Service providers (e.g., shipping, hosting, payment, analytics).</li>
          <li className='text-xs'>Professional advisors (e.g., legal, accounting, audit).</li>
          <li className='text-xs'>Law enforcement or regulators where legally required.</li>
          <li className='text-xs'>Business transfers (e.g., merger or acquisition scenarios).</li>
        </ul>
        <p className='text-xs'>All third parties are contractually bound to protect your information and limit use to agreed purposes.</p>
  
        <h2 className="font-semibold text-sm mt-4">9. International Transfers</h2>
        <p className='text-xs'>
          Your information may be transferred to Canada, the United States, or other countries where our service providers operate. 
          We use contractual safeguards or equivalent measures where required.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">10. Data Retention</h2>
        <p className='text-xs'>
          We keep personal information as long as necessary for the purposes outlined here, such as fulfilling orders, tax compliance, and warranty service. 
          For example, transaction records may be retained for up to 7 years.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">11. Your Rights</h2>
        <p className='text-xs'>You may request to:</p>
        <ul className="list-none pl-6">
          <li className='text-xs'>Access your personal information.</li>
          <li className='text-xs'>Correct or update inaccuracies.</li>
          <li className='text-xs'>Request deletion of your information (subject to legal exceptions).</li>
          <li className='text-xs'>Restrict or object to certain processing.</li>
          <li className='text-xs'>Withdraw consent where applicable.</li>
          <li className='text-xs'>Request a portable copy of your data.</li>
        </ul>
        <p className='text-xs'>
          Contact <a href="mailto:info@voguedecor.com" className="underline text-black">info@voguedecor.com</a> to exercise these rights. 
          We may require ID verification to process requests.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">12. Marketing & Unsubscribe</h2>
        <p className='text-xs'>
          Marketing emails are sent only where permitted or consented. Each includes an unsubscribe link. 
          You can also manage your preferences in your account or by contacting Customer Care. 
          Requests are processed within 3 business days.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">13. Security</h2>
        <p className='text-xs'>
          We use encryption, secure hosting, and access controls to protect your information. 
          No online system is completely secure; if you suspect unauthorized access, contact us immediately.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">14. Children</h2>
        <p className='text-xs'>
          Our Services are not directed to children under 16. 
          We do not knowingly collect their information. 
          If you believe a child’s data was collected, contact us for deletion.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">15. Changes to this Policy</h2>
        <p className='text-xs'>
          We may revise this Policy to reflect changes in practices, technology, or laws. 
          Updates will appear here with an effective date. Continued use constitutes acceptance.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">16. Contact Us</h2>
        <p className='text-xs'>
          Email: <a href="mailto:info@voguedecor.com" className="underline text-black">info@voguedecor.com</a><br />
          Phone: +1 (888) 880 8232<br />
          Mail:<br />
          Vogue Decor<br />
          7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC H4T 1E7<br />
          825 Denison St Unit 2, Markham, ON L3R 5E4
        </p>
      </>
    )
  },  
  {
    id: "shipping",
    label: "Shipping & Return Policy",
    content: (
      <>
        <p className='text-xs'><strong>Effective Date:</strong> 2025-10-01</p>

        <h2 className="font-semibold text-sm mt-4">Free Shipping Promotion</h2>
        <p className='text-xs'>
          FREE SHIPPING ON ORDERS OVER $2,999 WITHIN CANADA. Oversized or remote addresses may be excluded.
        </p>

        <h2 className="font-semibold text-sm mt-4">Shipping Methods & Processing</h2>
        <p className='text-xs'>
          Standard carrier delivery for boxed items; freight or white-glove for large furniture. Orders usually ship in 1–2 business days after payment unless otherwise stated.
        </p>

        <h2 className="font-semibold text-sm mt-4">Estimated Transit Times</h2>
        <ul className="list-none pl-6">
          <li className='text-xs'>Ontario: 1–3 business days</li>
          <li className='text-xs'>Quebec: 1–3 business days</li>
          <li className='text-xs'>Alberta: 3–7 business days</li>
          <li className='text-xs'>British Columbia: 5–9 business days</li>
          <li className='text-xs'>Manitoba: 2–6 business days</li>
        </ul>

        <h2 className="font-semibold text-sm mt-4">Pickup (Local)</h2>
        <p className='text-xs'>
          Choose “Pickup” at checkout. We’ll email when ready. Locations:
        </p>
        <ul className="list-none pl-6">
          <li className='text-xs'>Montreal: 7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC</li>
          <li className='text-xs'>Toronto: 825 Denison St Unit 2, Markham, ON (2 business days’ notice required)</li>
        </ul>

        <h2 className="font-semibold text-sm mt-4">Returns, Cancellations & Refunds</h2>
        <p className='text-xs'>
          Returns accepted within 14 days of delivery unless otherwise stated. Items must be unused and in original packaging. Return shipping is the customer’s responsibility unless due to our error.
        </p>
        <p className='text-xs'>
          Contact info@voguedecor.com for return authorization. Refunds are processed within 7 business days after inspection.
        </p>

        <h2 className="font-semibold text-sm mt-4">Warranty vs Returns</h2>
        <p className='text-xs'>
          Warranty claims cover manufacturing defects within 12 months of delivery. Contact info@voguedecor.com with photos and order number for review.
        </p>

        <h2 className="font-semibold text-sm mt-4">Contact for Shipping Questions</h2>
        <p className='text-xs'>
          Customer Care: +1 (888) 880-8232<br />
          Email: info@voguedecor.com<br />
          Mailing:<br />
          - 7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC H4T 1E7<br />
          - 825 Denison St Unit 2, Markham, ON L3R 5E4
        </p>
      </>
    ),
  }
];

export default function TermsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialTab = searchParams.get('tab') || 'terms';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const currentTab = searchParams.get('tab');
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    router.replace(`?tab=${tabId}`); 
  };

  return (
    <div className="overflow-hidden bg-white text-gray-900">
      {/* Hero Image */}
      <div className="relative h-60 md:h-72 w-full">
        <img
          src="https://skims-sanity.imgix.net/images/hfqi0zm0/production/98ed3459d8117c29080061f45d8b4f00e15550ed-2878x800.png?auto=format&ixlib=react-9.10.0&w=2878&h=800&dpr=2&q=50"
          alt="Hero Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="mx-auto max-w-9xl px-4 md:px-16 py-6 pt-0 gap-8">
        <div className="mb-4">
          <BreadCrumb currentPage={"Terms of Service"} />
        </div>
        <h1 className="text-3xl font-bold">Terms of Service</h1>
      </div>

      <div className="mx-auto max-w-9xl px-4 md:px-16 py-12 flex flex-col md:flex-row gap-8">
        {/* Left Tabs / Mobile Dropdown */}
        <div className="w-full md:w-1/4">
          <div className="block md:hidden mb-4">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>

          <nav className="hidden md:flex md:flex-col gap-2 md:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-3 py-2 font-semibold rounded hover:bg-gray-100 w-full ${
                  activeTab === tab.id ? 'bg-gray-100 text-black-700' : 'text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow">
          <h1 className="mb-6 text-md font-bold text-black-700">
            {tabs.find((tab) => tab.id === activeTab).label}
          </h1>
          <div className="space-y-4">
            {tabs.find((tab) => tab.id === activeTab).content}
          </div>
        </div>
      </div>
    </div>
  );
}
