"use client";

import BreadCrumb from "components/breadCrum";
import { useState } from "react";

const faqData = {
  "Retours et Échanges": [
    {
      question: "Puis-je réimprimer mon étiquette ou obtenir à nouveau le code mobile ?",
      answer:
        "Oui, vous pouvez réimprimer votre étiquette ou demander un nouveau code mobile depuis votre compte dans la section « Commandes ».",
    },
    {
      question: "Où en est mon retour ?",
      answer:
        "Vous pouvez suivre votre retour à l’aide du numéro de suivi fourni dans l’email de confirmation de votre commande.",
    },
    {
      question: "Puis-je échanger mon article ?",
      answer:
        "Les échanges sont possibles si l’article est éligible. Veuillez contacter le support pour lancer un échange.",
    },
    {
      question: "Pouvez-vous m’aider avec un produit endommagé ?",
      answer:
        "Oui, bien sûr. Veuillez fournir des photos du produit endommagé ainsi que les détails de votre commande.",
    },
  ],
  "Commandes": [
    {
      question: "Comment puis-je passer une commande ?",
      answer:
        "Vous pouvez passer une commande en sélectionnant votre article et en complétant le processus de paiement.",
    },
    {
      question: "Puis-je annuler ma commande ?",
      answer:
        "Les commandes peuvent être annulées uniquement avant leur expédition. Contactez le support dès que possible.",
    },
  ],
  "Livraison": [
    {
      question: "Livrez-vous à l’international ?",
      answer:
        "Oui, nous livrons à l’international. Les frais et délais de livraison varient selon la destination.",
    },
  ],
};

export default function FAQsPage() {
  const [activeTab, setActiveTab] = useState(Object.keys(faqData)[0]);
  const [openAccordion, setOpenAccordion] = useState(null);

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-60 md:h-72 w-full">
        <img
          src="https://skims-sanity.imgix.net/images/hfqi0zm0/production/98ed3459d8117c29080061f45d8b4f00e15550ed-2878x800.png?auto=format&ixlib=react-9.10.0&w=2878&h=800&dpr=2&q=50"
          alt="Bannière principale"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* FAQs Section */}
      <div className="min-h-screen bg-white text-gray-900 py-16 px-4 md:px-16">
        <div className="mb-4">
          <BreadCrumb currentPage={"FAQs"} />
        </div>

        <h1 className="text-3xl font-bold mb-8">Foire aux Questions (FAQs)</h1>

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
                className={`text-left font-semibold py-2 px-3 rounded transition-colors ${
                  activeTab === tab
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

                {/* Accordion Content */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    openAccordion === index
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
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
