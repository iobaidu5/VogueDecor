"use client";

import BreadCrumb from 'components/breadCrum';
import Link from 'next/link';
import { useState } from 'react';

const tabs = [
  {
    id: 'terms',
    label: 'Terms',
    content: (
      <>
        <p>Last updated August 13, 2025</p>
        <p>
          Welcome to the voguedecor website, <strong>voguedecor.com</strong> (the “Site”), and the voguedecor mobile application (the “App,” and together with the Site, the “Platform”). The Platform is operated by voguedecor Body, Inc. (the “Company,” “we,” “us,” “our”). Each person who accesses and/or uses the Platform (each a “User,” “you,” or “your”) should please read these Terms of Service (“Terms of Service”) carefully before using the Platform. By accessing or using the Platform, you signify that you have read, understand and agree to be bound by these Terms of Service, regardless of whether you are a registered user of the Site or the App. If you do not agree to these Terms of Service, please do not use the Site or the App.
        </p>
        <p>
          TO THE EXTENT PERMITTED BY LAW, BY USING THE SERVICE, YOU ARE AGREEING TO ARBITRATE DISPUTES AGAINST US IN YOUR INDIVIDUAL CAPACITY, AND YOU ARE WAIVING YOUR RIGHT TO ACT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. PLEASE READ THE DISPUTE RESOLUTION SECTION 15 BELOW FOR ADDITIONAL INFORMATION.
        </p>
      </>
    )
  },
  {
    id: 'privacy',
    label: 'Privacy',
    content: (
      <>
        <p>To make online shopping faster and easier, you may register on the Vogue Decor website. As a registered customer, you only have to enter your shipping addresses and billing information once; they will be securely stored with us for your future use.</p>
        <p>If you are using a public computer, we strongly encourage you to <strong>LOG OUT</strong> at the conclusion of your session.</p>
      </>
    )
  },
  { id: 'promo', label: 'Promo Terms', content: <p>Promotional content terms go here...</p> },
  { id: 'data', label: 'Data Request', content: <p>Data request instructions go here...</p> },
  { id: 'unsubscribe', label: 'Unsubscribe', content: <p>Unsubscribe instructions go here...</p> },
  { id: 'cookie', label: 'Cookie Policy', content: <p>Cookie policy details go here...</p> },
  { id: 'california', label: 'California Privacy Notice', content: <p>California privacy notice content here...</p> },
  { id: 'dontsell', label: 'Do Not Sell or Share My Info', content: <p>Details for users in California...</p> },
];

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState('terms');

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
        {/* Left Tabs */}
        <nav className="flex flex-wrap md:flex-col gap-2 md:gap-4 w-full md:w-1/4">
          {tabs.map(tab => (
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
          <h1 className="mb-6 text-2xl font-bold text-black-700">
            {tabs.find(tab => tab.id === activeTab).label}
          </h1>
          <div className="space-y-4">
            {tabs.find(tab => tab.id === activeTab).content}
          </div>
        </div>
      </div>
    </div>
  );
}
