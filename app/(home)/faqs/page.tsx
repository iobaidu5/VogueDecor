"use client";

import BreadCrumb from "components/breadCrum";
import { useState } from "react";

const faqData = [
  {
    question: "What makes Vogue Decor Furniture commercial grade?",
    answer: "All our furniture is built using high-quality materials designed to withstand daily use in busy commercial environments. Each piece combines durability, comfort, and style to meet restaurant and hospitality standards."
  },
  {
    question: "Do you offer furniture for both indoor and outdoor spaces?",
    answer: "Yes! We offer a wide range of commercial-grade furniture for both indoor and outdoor use, from dining chairs and barstools to patio tables."
  },
  {
    question: "Do you offer custom orders?",
    answer: "Yes, we offer custom orders to fit your project needs. For all custom solutions, contact us and our team will bring your vision to life."
  },
  {
    question: "How do I place an order for my restaurant or café?",
    answer: "You can order directly online, in store, or contact us for custom orders. Our team will guide you through product selection, customization, and delivery."
  },
  {
    question: "Is there a minimum order quantity for custom orders?",
    answer: "Yes, custom orders require a minimum of 150 units or more. Our team will confirm all details and provide a quote based on your project needs."
  },
  {
    question: "How long does delivery usually take?",
    answer: "Delivery times depend on location and product availability. Check our shipping and for custom orders, timelines may vary based on the project and production schedule."
  },
  {
    question: "Do you offer design or layout assistance for restaurants?",
    answer: "Yes. Our team can help with layout planning and product recommendations to make sure your space looks cohesive and functions efficiently."
  },
  {
    question: "What materials are your chairs and tables made from?",
    answer: "We use premium materials such as stainless steel, solid wood, HPL, and microfiber leatherette, all designed for strength, easy maintenance, and long-lasting use."
  },
  {
    question: "Are your products covered by a warranty?",
    answer: "Yes, our commercial-grade products come with a limited 1-year manufacturer's warranty."
  },
  {
    question: "How do I maintain and clean commercial-grade furniture?",
    answer: "Most of our furniture can be cleaned with a soft cloth and mild soap. Avoid harsh chemicals or abrasive materials to preserve the finish and fabric."
  },
  {
    question: "Can I see samples or visit your showroom before ordering?",
    answer: "Yes, you're welcome to visit our showroom during opening hours or schedule an appointment to view our full range of furniture and finishes."
  },
  {
    question: "Do you offer bulk pricing or trade discounts?",
    answer: "It is available on demand. Contact us for more details."
  }
];

export default function FAQsPage() {
  const [openAccordion, setOpenAccordion] = useState(null);

  return (
    <>
      <div className="relative h-60 md:h-72 w-full">
        <img
          src="https://skims-sanity.imgix.net/images/hfqi0zm0/production/98ed3459d8117c29080061f45d8b4f00e15550ed-2878x800.png?auto=format&ixlib=react-9.10.0&w=2878&h=800&dpr=2&q=50"
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

        {/* FAQ Accordions */}
        <div className="max-w-4xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() =>
                  setOpenAccordion(openAccordion === index ? null : index)
                }
                className="w-full text-left py-6 flex justify-between items-center font-medium hover:bg-gray-50 transition-colors"
              >
                <span className="text-md pr-4">{faq.question}</span>
                <span className="text-xl flex-shrink-0">
                  {openAccordion === index ? "−" : "+"}
                </span>
              </button>

              {/* Animated Accordion Content */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  openAccordion === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-6 text-gray-700 text-sm">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}