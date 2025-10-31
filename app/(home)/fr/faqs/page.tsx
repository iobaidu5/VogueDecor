"use client";

import BreadCrumb from "components/breadCrum";
import { useState } from "react";

const faqData = [
  {
    question: "Qu'est-ce qui rend les meubles Vogue Decor de qualité commerciale ?",
    answer: "Tous nos meubles sont construits avec des matériaux de haute qualité conçus pour résister à une utilisation quotidienne dans des environnements commerciaux très fréquentés. Chaque pièce allie durabilité, confort et style pour répondre aux normes de la restauration et de l'hôtellerie."
  },
  {
    question: "Proposez-vous des meubles pour les espaces intérieurs et extérieurs ?",
    answer: "Oui ! Nous proposons une large gamme de meubles de qualité commerciale pour les espaces intérieurs et extérieurs, des chaises de salle à manger et des tabourets de bar aux tables de patio."
  },
  {
    question: "Proposez-vous des commandes personnalisées ?",
    answer: "Oui, nous proposons des commandes personnalisées adaptées aux besoins de votre projet. Pour toutes solutions sur mesure, contactez-nous et notre équipe donnera vie à votre vision."
  },
  {
    question: "Comment puis-je passer une commande pour mon restaurant ou café ?",
    answer: "Vous pouvez commander directement en ligne, en magasin, ou nous contacter pour des commandes personnalisées. Notre équipe vous guidera dans la sélection des produits, la personnalisation et la livraison."
  },
  {
    question: "Y a-t-il un minimum de commande pour les commandes personnalisées ?",
    answer: "Oui, les commandes personnalisées nécessitent un minimum de 150 unités ou plus. Notre équipe confirmera tous les détails et fournira un devis basé sur les besoins de votre projet."
  },
  {
    question: "Combien de temps prend généralement la livraison ?",
    answer: "Les délais de livraison dépendent de la localisation et de la disponibilité des produits. Consultez nos informations de livraison. Pour les commandes personnalisées, les délais peuvent varier selon le projet et le calendrier de production."
  },
  {
    question: "Proposez-vous une assistance à la conception ou à l'aménagement pour les restaurants ?",
    answer: "Oui. Notre équipe peut aider à la planification de l'aménagement et aux recommandations de produits pour garantir que votre espace soit cohérent et fonctionne efficacement."
  },
  {
    question: "De quels matériaux sont faits vos chaises et tables ?",
    answer: "Nous utilisons des matériaux premium tels que l'acier inoxydable, le bois massif, le HPL et le simili-cuir en microfibre, tous conçus pour la résistance, un entretien facile et une utilisation durable."
  },
  {
    question: "Vos produits sont-ils couverts par une garantie ?",
    answer: "Oui, nos produits de qualité commerciale sont couverts par une garantie limitée du fabricant d'un an."
  },
  {
    question: "Comment entretenir et nettoyer les meubles de qualité commerciale ?",
    answer: "La plupart de nos meubles peuvent être nettoyés avec un chiffon doux et du savon doux. Évitez les produits chimiques agressifs ou les matériaux abrasifs pour préserver la finition et le tissu."
  },
  {
    question: "Puis-je voir des échantillons ou visiter votre showroom avant de commander ?",
    answer: "Oui, vous êtes invités à visiter notre showroom pendant les heures d'ouverture ou à prendre rendez-vous pour voir notre gamme complète de meubles et finitions."
  },
  {
    question: "Proposez-vous des tarifs de gros ou des remises professionnelles ?",
    answer: "C'est disponible sur demande. Contactez-nous pour plus de détails."
  }
];

export default function FAQsPage() {
  const [openAccordion, setOpenAccordion] = useState(null);

  return (
    <>
      {/* Section Hero */}
      <div className="relative h-60 md:h-72 w-full">
        <img
          src="https://skims-sanity.imgix.net/images/hfqi0zm0/production/98ed3459d8117c29080061f45d8b4f00e15550ed-2878x800.png?auto=format&ixlib=react-9.10.0&w=2878&h=800&dpr=2&q=50"
          alt="Bannière principale"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Section FAQs */}
      <div className="min-h-screen bg-white text-gray-900 py-16 px-4 md:px-16">
        <div className="mb-4">
          <BreadCrumb currentPage={"FAQs"} />
        </div>

        <h1 className="text-3xl font-bold mb-8">Foire aux Questions (FAQs)</h1>

        {/* Accordéons FAQ */}
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

              {/* Contenu de l'accordéon animé */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  openAccordion === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
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