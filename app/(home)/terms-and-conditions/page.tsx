"use client";

import BreadCrumb from 'components/breadCrum';
import { useState } from 'react';

const tabs = [
  {
    id: 'Acceptance_of_Terms',
    label: 'Acceptance of Terms',
    content: (
      <>
        <p>Welcome to the Vogue Decor website, vogue-decor.com (the “Site”). The Site is operated by Vogue Decor (the “Company,” “we,” “us,” or “our”). Each person who accesses and/or uses the Site (each a “User,” “you,” or “your”) should read these Terms of Service (“Terms”) carefully before using the Site. By accessing or using the Site, you signify that you have read, understand, and agree to be bound by these Terms, whether or not you are a registered user.</p>
        <p><strong>IF YOU DO NOT AGREE TO THESE TERMS, PLEASE DO NOT USE THE PLATFORM.</strong></p>
        <p>We may update these Terms at any time by posting the amended Terms on the Site; such changes will be effective once posted. Your continued access to or use of the Site after changes are posted constitutes your acceptance of the updated Terms. We may add, remove or change Site features at any time without prior notice.</p>
        <p><strong>No mobile app is available at this time.</strong> The Company maintains Site and social media platforms only.</p>
      </>
    )
  },
  {
    id: 'Account_Registration_Security',
    label: 'Account Registration & Security',
    content: (
      <>
        <p>You may create an account to speed checkout and store addresses. Keep your credentials confidential. You are responsible for all activity under your account. Log out when using a public computer and notify Customer Care immediately if you suspect unauthorized access.</p>
      </>
    )
  },
  {
    id: 'Orders_Contract_Formation',
    label: 'Orders & Contract Formation',
    content: (
      <>
        <p>Placing an order on the Site is an offer to purchase the listed goods. We will acknowledge receipt by email. A binding contract is formed only when we send an order confirmation or dispatch notice. We reserve the right to cancel or refuse orders for any reason, including pricing or inventory errors.</p>
      </>
    )
  },
  {
    id: 'Pricing_Payment',
    label: 'Pricing & Payment',
    content: (
      <>
        <p>Prices on the Site are listed in CAD unless otherwise noted and exclude applicable taxes and shipping fees unless explicitly stated. Final taxes and shipping are calculated at checkout. We accept the payment methods displayed at checkout. If a pricing error is identified, we may cancel the order and refund any amounts already paid.</p>
      </>
    )
  },
  {
    id: 'Shipping_Pickup',
    label: 'Shipping & Pickup (summary)',
    content: (
      <>
        <p><strong>Free shipping promotion:</strong> FREE SHIPPING ON ORDERS OVER $2,999 WITHIN CANADA (promotion).</p>
        <p><strong>Delivery & Transit:</strong> Typical carrier transit times (business days):</p>
        <ul className="list-disc pl-6">
          <li>Ontario & Quebec: 1–3</li>
          <li>Alberta: 3–7</li>
          <li>British Columbia: 5–9</li>
        </ul>
        <p>Transit times are estimates and may vary.</p>
        <p><strong>Pickup:</strong> Available at Montreal (7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC) and Toronto (825 Denison St Unit 2, Markham, ON). Toronto pickup may require 2 business days’ notice.</p>
        <p><strong>Oversized / Freight items:</strong> Large or palletized items may ship via freight/LTL or white-glove carriers and may incur additional fees. We will notify you before shipping if freight arrangements or additional charges apply.</p>
        <p><strong>Shipping costs & title:</strong> Shipping costs vary by item and destination; final shipping is shown at checkout. Title and risk of loss pass in accordance with the Shipping Policy (see link below).</p>
        <p>See our full Shipping Policy: <em>Link</em></p>
      </>
    )
  },
  {
    id: 'Returns_Cancellations_Refunds',
    label: 'Returns, Cancellations & Refunds',
    content: (
      <>
        <p>Returns and exchanges are governed by our Returns Policy: <em>Link</em>. Standard returns window: 14 days from delivery for eligible items, unless a different period is stated at purchase. Custom or commercial orders may be non-returnable or subject to special cancellation terms disclosed at order confirmation. Refunds are issued to the original payment method once the returned goods are received and inspected.</p>
      </>
    )
  },
  {
    id: 'Warranty_Product_Care',
    label: 'Warranty & Product Care',
    content: (
      <>
        <p>We warrant our goods to be free from manufacturing defects for the warranty period shown on the product page. If no period is specified, the default warranty is 12 months from delivery. Normal wear and tear, misuse, accidental damage, or modifications are not covered. Warranty remedies are limited to repair, replacement, or refund at our option. Contact Customer Care for more info.</p>
      </>
    )
  },
  {
    id: 'Limitation_Liability_Indemnity',
    label: 'Limitation of Liability & Indemnity',
    content: (
      <>
        <p>To the maximum extent permitted by law, our liability for any claim arising from your purchase or use of products is limited to the purchase price of the affected goods. We are not liable for indirect, incidental, special, consequential, or punitive damages. You agree to indemnify and hold Vogue Decor harmless from claims arising from your misuse of products or breach of these Terms.</p>
      </>
    )
  },
  {
    id: 'Intellectual_Property',
    label: 'Intellectual Property',
    content: (
      <>
        <p>All Site content, text, images, designs, trademarks, and code is owned or licensed by Vogue Decor. You may not reproduce, distribute, or create derivative works from our content without prior written permission.</p>
      </>
    )
  },
  {
    id: 'Privacy_Cookies',
    label: 'Privacy & Cookies',
    content: (
      <>
        <p>Our Privacy Policy explains how we collect and use personal data. By using the Site you consent to our collection and processing of data as described in the Privacy Policy: /privacy (link).</p>
      </>
    )
  },
  {
    id: 'Governing_Law',
    label: 'Governing Law & Dispute Resolution',
    content: (
      <>
        <p>These Terms are governed by the laws of the Province of Québec and the federal laws of Canada applicable therein.</p>
      </>
    )
  },
  {
    id: 'Language_Quebec',
    label: 'Language (Québec)',
    content: (
      <>
        <p>If you are a consumer in the Province of Québec, you may request a French version of these Terms. An official French version is available on request and will be posted on the Site.</p>
      </>
    )
  },
  {
    id: 'Changes_to_Terms',
    label: 'Changes to Terms',
    content: (
      <>
        <p>We may update these Terms; material changes will be posted here with an updated Effective Date.</p>
      </>
    )
  },
  {
    id: 'Contact_Questions',
    label: 'Contact & Questions',
    content: (
      <>
        <p>Customer Care: +1 (888) 880-8232</p>
        <p>Email: info@voguedecor.com</p>
        <p>Mailing addresses: 7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC H4T 1E7</p>
      </>
    )
  },
];

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState('Acceptance_of_Terms');

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
        {/* Tabs for mobile */}
        <div className="block md:hidden mb-4">
          <select
            className="w-full p-2 border rounded"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        {/* Left Tabs (desktop) */}
        <nav className="hidden md:flex flex-col gap-2 w-full md:w-1/4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left px-3 py-2 font-semibold rounded hover:bg-gray-100 w-full md:w-auto ${
                activeTab === tab.id ? 'bg-gray-100 text-black-700' : 'text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right Content */}
        <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow">
          <h2 className="mb-6 text-2xl font-bold text-black-700">
            {tabs.find((tab) => tab.id === activeTab)?.label}
          </h2>
          <div className="space-y-4">
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>
  );
}
