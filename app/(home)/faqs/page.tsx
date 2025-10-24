"use client";

import BreadCrumb from "components/breadCrum";
import { useState } from "react";

const faqData = {
  "Returns & Exchanges": [
    {
      question: "Can I reprint my label or obtain mobile code again?",
      answer:
        "Yes, you can reprint your label or request a new mobile code through your account under 'Orders'.",
    },
    {
      question: "Where is my return?",
      answer:
        "You can track your return using the tracking number provided in your order confirmation email.",
    },
    {
      question: "Can I exchange my item?",
      answer:
        "Exchanges are possible if the item is eligible. Please contact support to initiate an exchange.",
    },
    {
      question: "Can you help with a damaged product?",
      answer:
        "Yes, we can help. Please provide photos of the damaged product along with your order details.",
    },
  ],
  Ordering: [
    {
      question: "How do I place an order?",
      answer:
        "You can place an order by selecting your item and completing the checkout process.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Orders can only be canceled before they are shipped. Contact support immediately.",
    },
  ],
  Shipping: [
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we offer international shipping. Shipping costs and times vary by destination.",
    },
  ],
};

export default function FAQsPage() {
  const [activeTab, setActiveTab] = useState(Object.keys(faqData)[0]);
  const [openAccordion, setOpenAccordion] = useState(null);

  return (
    <>
        <div className="relative h-60 md:h-72 w-full">
    <img
      src="https://skims-sanity.imgix.net/images/hfqi0zm0/production/98ed3459d8117c29080061f45d8b4f00e15550ed-2878x800.png?auto=format&ixlib=react-9.10.0&w=2878&h=800&dpr=2&q=50" // replace with your hero image path
      alt="Hero Banner"
      className="object-cover w-full h-full"
    />
    <div className="absolute inset-0 bg-black/30"></div>
  </div>
    <div className="min-h-screen bg-white text-gray-900 py-16 px-4 md:px-16">

      <div className="mb-4">
        <BreadCrumb currentPage={"FAQs"} />
      </div>
      <h1 className="text-3xl font-bold mb-8">FAQs</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Tabs */}
        <div className="md:w-1/4 flex flex-col space-y-3">
          {Object.keys(faqData).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOpenAccordion(null);
              }}
              className={`text-left font-semibold py-2 px-3 rounded transition-colors ${activeTab === tab
                  ? "bg-gray-200 underline"
                  : "hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right Accordion */}
        <div className="md:w-3/4">
          {faqData[activeTab].map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() =>
                  setOpenAccordion(openAccordion === index ? null : index)
                }
                className="w-full text-left py-4 flex justify-between items-center font-medium"
              >
                {faq.question}
                <span className="text-xl">
                  {openAccordion === index ? "−" : "+"}
                </span>
              </button>

              {/* Animated Accordion Content */}
              <div
                className={`transition-all duration-500 overflow-hidden ${openAccordion === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="pb-4 text-gray-700">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
