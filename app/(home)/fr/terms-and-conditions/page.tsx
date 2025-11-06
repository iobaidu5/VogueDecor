"use client";

import BreadCrumb from 'components/breadCrum';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const tabs = [
  {
    id: 'terms',
    label: 'Conditions',
    content: (
      <>
        <p className='text-xs'><strong>VOGUE DECOR</strong></p>
        <p className='text-xs'><strong>Date d'entrée en vigueur :</strong> 2025-10-01</p>

        <h2 className="font-semibold text-sm mt-4">1. Acceptation des conditions</h2>
        <p className='text-xs'>
          Bienvenue sur le site web de Vogue Decor, <strong>vogue-decor.com</strong> (le « Site »). Le Site est exploité par Vogue Decor (la « Société », « nous », « notre »). Chaque personne qui accède et/ou utilise le Site (chaque « Utilisateur », « vous », « votre ») doit lire attentivement ces Conditions de service (« Conditions ») avant d'utiliser le Site. En accédant ou en utilisant le Site, vous signifiez que vous avez lu, compris et accepté d'être lié par ces Conditions, que vous soyez un utilisateur enregistré ou non.
        </p>
        <p className='text-xs'><strong>SI VOUS N'ACCEPTEZ PAS CES CONDITIONS, VEUILLEZ NE PAS UTILISER LA PLATEFORME.</strong></p>
        <p className='text-xs'>
          Nous pouvons mettre à jour ces Conditions à tout moment en publiant les Conditions modifiées sur le Site ; ces modifications seront effectives une fois publiées. Votre accès continu ou votre utilisation du Site après la publication des modifications constitue votre acceptation des Conditions mises à jour. Nous pouvons ajouter, supprimer ou modifier les fonctionnalités du Site à tout moment sans préavis.
        </p>
        <p className='text-xs'>Aucune application mobile n'est disponible pour le moment. La Société maintient uniquement le Site et les plateformes de médias sociaux.</p>

        <h2 className="font-semibold text-sm mt-4">2. Inscription au compte et sécurité</h2>
        <p className='text-xs'>
          Vous pouvez créer un compte pour accélérer le paiement et stocker les adresses. Gardez vos identifiants confidentiels. Vous êtes responsable de toute activité sous votre compte. Déconnectez-vous lorsque vous utilisez un ordinateur public et informez immédiatement le Service client si vous soupçonnez un accès non autorisé.
        </p>

        <h2 className="font-semibold text-sm mt-4">3. Commandes et formation du contrat</h2>
        <p className='text-xs'>
          Passer une commande sur le Site constitue une offre d'achat des biens listés. Nous accuserons réception par email. Un contrat contraignant n'est formé que lorsque nous envoyons une confirmation de commande ou un avis d'expédition. Nous nous réservons le droit d'annuler ou de refuser les commandes pour toute raison, y compris les erreurs de prix ou de stock.
        </p>

        <h2 className="font-semibold text-sm mt-4">4. Prix et paiement</h2>
        <p className='text-xs'>
          Les prix sur le Site sont indiqués en CAD sauf indication contraire et excluent les taxes applicables et les frais d'expédition, sauf indication explicite. Les taxes finales et l'expédition sont calculées au paiement. Nous acceptons les modes de paiement affichés au paiement. Si une erreur de prix est identifiée, nous pouvons annuler la commande et rembourser les montants déjà payés.
        </p>

        <h2 className="font-semibold text-sm mt-4">5. Expédition et ramassage (résumé)</h2>
        <p className='text-xs'><strong>Promotion de livraison gratuite :</strong> LIVRAISON GRATUITE POUR LES COMMANDES DE PLUS DE 2 999 $ AU CANADA (promotion).</p>
        <p className='text-xs'><strong>Livraison et transit :</strong> Délais de transit typiques des transporteurs (jours ouvrables) :</p>
        <ul className="list-none pl-6">
          <li className='text-xs'>Ontario et Québec : 1–3</li>
          <li className='text-xs'>Alberta : 3–7</li>
          <li className='text-xs'>Colombie-Britannique : 5–9</li>
        </ul>
        <p className='text-xs'>Les délais de transit sont des estimations et peuvent varier.</p>
        <p className='text-xs'>
          <strong>Ramassage :</strong> Disponible à Montréal (7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC) et Toronto (825 Denison St Unit 2, Markham, ON). Le ramassage à Toronto peut nécessiter un préavis de 2 jours ouvrables.
        </p>
        <p className='text-xs'>
          <strong>Articles surdimensionnés / fret :</strong> Les articles volumineux ou palettisés peuvent être expédiés par fret/LTL ou par des transporteurs avec service de livraison et peuvent entraîner des frais supplémentaires. Nous vous informerons avant l'expédition si des arrangements de fret ou des frais supplémentaires s'appliquent.
        </p>
        <p className='text-xs'>
          <strong>Coûts d'expédition et titre :</strong> Les coûts d'expédition varient selon l'article et la destination ; les frais d'expédition finaux sont indiqués au paiement. Le titre et le risque de perte sont transférés conformément à la Politique d'expédition (voir le lien ci-dessous).
        </p>
        <p className='text-xs'>Voir notre Politique d'expédition complète : <em><Link className='text-black' href='/fr/terms-and-conditions?tab=shipping'>Lien</Link></em></p>

        <h2 className="font-semibold text-sm mt-4">6. Retours, annulations et remboursements</h2>
        <p className='text-xs'>
          Les retours et échanges sont régis par notre Politique de retours : <em><Link className='text-black' href='/fr/terms-and-conditions?tab=privacy'>Lien</Link></em>. Délai de retour standard : 14 jours après la livraison pour les articles éligibles, sauf si une période différente est indiquée lors de l'achat. Les commandes personnalisées ou commerciales peuvent être non remboursables ou soumises à des conditions d'annulation spéciales communiquées lors de la confirmation de commande. Les remboursements sont émis sur le mode de paiement d'origine une fois les produits retournés reçus et inspectés.
        </p>

        <h2 className="font-semibold text-sm mt-4">7. Garantie et entretien des produits</h2>
        <p className='text-xs'>
          Nous garantissons que nos produits sont exempts de défauts de fabrication pour la période de garantie indiquée sur la page du produit. Si aucune période n'est spécifiée, la garantie par défaut est de 12 mois à partir de la livraison. L'usure normale, la mauvaise utilisation, les dommages accidentels ou les modifications ne sont pas couverts. Les recours en garantie sont limités à la réparation, au remplacement ou au remboursement à notre discrétion. Contactez le Service client pour plus d'informations.
        </p>

        <h2 className="font-semibold text-sm mt-4">8. Limitation de responsabilité et indemnisation</h2>
        <p className='text-xs'>
          Dans la mesure maximale permise par la loi, notre responsabilité pour toute réclamation découlant de votre achat ou utilisation des produits est limitée au prix d'achat des biens concernés. Nous ne sommes pas responsables des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs. Vous acceptez d'indemniser et de dégager Vogue Decor de toute responsabilité concernant les réclamations découlant de votre mauvaise utilisation des produits ou de votre violation de ces Conditions.
        </p>

        <h2 className="font-semibold text-sm mt-4">9. Propriété intellectuelle</h2>
        <p className='text-xs'>
          Tout le contenu du Site, texte, images, conceptions, marques et code sont la propriété de Vogue Decor ou sont utilisés sous licence. Vous ne pouvez pas reproduire, distribuer ou créer des œuvres dérivées de notre contenu sans autorisation écrite préalable.
        </p>

        <h2 className="font-semibold text-sm mt-4">10. Confidentialité et cookies</h2>
        <p className='text-xs'>
          Notre Politique de confidentialité explique comment nous collectons et utilisons les données personnelles. En utilisant le Site, vous consentez à notre collecte et traitement des données comme décrit dans la Politique de confidentialité : /privacy (lien).
        </p>

        <h2 className="font-semibold text-sm mt-4">11. Droit applicable et résolution des litiges</h2>
        <p className='text-xs'>
          Ces Conditions sont régies par les lois de la province de Québec et les lois fédérales du Canada applicables.
        </p>

        <h2 className="font-semibold text-sm mt-4">12. Langue (Québec)</h2>
        <p className='text-xs'>
          Si vous êtes un consommateur dans la province de Québec, vous pouvez demander une version française de ces Conditions. Une version française officielle est disponible sur demande et sera publiée sur le Site.
        </p>

        <h2 className="font-semibold text-sm mt-4">13. Modifications des conditions</h2>
        <p className='text-xs'>
          Nous pouvons mettre à jour ces Conditions ; les modifications importantes seront publiées ici avec une date d'entrée en vigueur mise à jour.
        </p>

        <h2 className="font-semibold text-sm mt-4">14. Contact et questions</h2>
        <p className='text-xs'>Service client : +1 (888) 880-8232</p>
        <p className='text-xs'>Email : info@voguedecor.com</p>
        <p className='text-xs'>Adresses postales : 7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC H4T 1E7</p>
      </>
    )
  },
  {
    id: 'privacy',
    label: 'Politique de confidentialité',
    content: (
      <>
        <p className='text-xs'><strong>VOGUE DECOR</strong></p>
        <p className='text-xs'><strong>Date d'entrée en vigueur :</strong> 2025-10-01</p>
  
        <h2 className="font-semibold text-sm mt-4">1. Introduction</h2>
        <p className='text-xs'>
          Bienvenue sur le site web de Vogue Decor, <strong>vogue-decor.com</strong> (le « Site Web »). Le Site Web et les services en ligne associés (les « Services ») sont exploités par Vogue Decor (la « Société », « nous », « notre »). 
          Nous respectons la confidentialité et la sécurité de vos informations personnelles (« Informations ») et nous nous engageons à les traiter de manière responsable.
        </p>
        <p className='text-xs'>
          Cette Politique de confidentialité explique quelles Informations nous collectons lorsque vous utilisez les Services, comment nous utilisons et partageons ces Informations, les bases légales du traitement le cas échéant, et les choix et droits à votre disposition.
        </p>
        <p className='text-xs'>
          Nous pouvons mettre à jour cette Politique de temps à autre. Les modifications importantes seront publiées ici avec une date d'entrée en vigueur mise à jour ; lorsque la loi l'exige, nous vous en informerons par email. En utilisant les Services après la publication des mises à jour, vous consentez à la Politique révisée.
        </p>
        <p className='text-xs'><strong>Note :</strong> Vogue Decor n'exploite actuellement aucune application mobile. « Services » fait référence à notre site web et à nos canaux en ligne/médias sociaux.</p>
  
        <h2 className="font-semibold text-sm mt-4">2. Responsable et informations de contact</h2>
        <p className='text-xs'><strong>Responsable :</strong> Vogue Decor Inc.</p>
        <p className='text-xs'><strong>Contact confidentialité :</strong> info@voguedecor.com</p>
        <p className='text-xs'><strong>Téléphone :</strong> +1 (888) 880-8232</p>
        <p className='text-xs'>
          <strong>Adresses :</strong><br />
          7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC H4T 1E7<br />
          825 Denison St Unit 2, Markham, ON L3R 5E4
        </p>
  
        <h2 className="font-semibold text-sm mt-4">3. Portée et focus géographique</h2>
        <p className='text-xs'>
          Cette Politique s'applique aux informations personnelles collectées via les Services et les interactions clients associées. Elle est rédigée pour se conformer aux lois canadiennes sur la confidentialité. 
          Si vous êtes situé en dehors du Canada ou des États-Unis, vos informations peuvent être transférées vers ces régions.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">4. Informations que nous collectons</h2>
        <ul className="list-none pl-6">
          <li className='text-xs'>Identité et contact : nom, nom de l'entreprise, email, téléphone, adresses de facturation et de livraison.</li>
          <li className='text-xs'>Compte et identifiants : nom d'utilisateur, mot de passe haché, paramètres du compte.</li>
          <li className='text-xs'>Données de transaction : historique des commandes, factures, retours, réclamations de garantie.</li>
          <li className='text-xs'>Données techniques et d'utilisation : adresse IP, navigateur, appareil, données d'analyse.</li>
          <li className='text-xs'>Marketing et engagement : préférences, activité email, statut d'opt-in.</li>
          <li className='text-xs'>Support client : communications, notes de livraison, informations de garantie.</li>
          <li className='text-xs'>Sources tierces et publiques : médias sociaux ou partenaires (lorsque permis).</li>
        </ul>
  
        <h2 className="font-semibold text-sm mt-4">5. Comment nous utilisons vos informations</h2>
        <ul className="list-none pl-6">
          <li className='text-xs'>Pour traiter les commandes, paiements, expéditions et retours.</li>
          <li className='text-xs'>Pour fournir un service client et répondre aux demandes.</li>
          <li className='text-xs'>Pour exploiter, améliorer et sécuriser le Site Web et les Services.</li>
          <li className='text-xs'>Pour envoyer des confirmations de commande et, lorsque permis, des emails marketing.</li>
          <li className='text-xs'>Pour prévenir la fraude et respecter les obligations légales.</li>
        </ul>
  
        <h2 className="font-semibold text-sm mt-4">6. Base légale du traitement</h2>
        <ul className="list-none pl-6">
          <li className='text-xs'><strong>Contrat et exécution :</strong> Pour exécuter vos achats.</li>
          <li className='text-xs'><strong>Consentement :</strong> Pour le marketing facultatif ou les cookies.</li>
          <li className='text-xs'><strong>Intérêts légitimes :</strong> Pour la sécurité, l'analyse et l'amélioration du service.</li>
          <li className='text-xs'><strong>Conformité légale :</strong> Pour la tenue de registres et les demandes légales.</li>
        </ul>
  
        <h2 className="font-semibold text-sm mt-4">7. Cookies et technologies de suivi</h2>
        <p className='text-xs'>
          Nous utilisons des cookies et des outils similaires pour la fonctionnalité, l'analyse et le marketing. Vous pouvez gérer les préférences de cookies via la bannière de cookies ou votre navigateur. 
          Voir notre Politique relative aux cookies pour plus de détails sur les fournisseurs tels que Google Analytics, Facebook Pixel et Klaviyo.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">8. Partage et divulgation</h2>
        <ul className="list-none pl-6">
          <li className='text-xs'>Prestataires de services (ex : expédition, hébergement, paiement, analyse).</li>
          <li className='text-xs'>Conseillers professionnels (ex : juridique, comptabilité, audit).</li>
          <li className='text-xs'>Forces de l'ordre ou régulateurs lorsque légalement requis.</li>
          <li className='text-xs'>Transferts d'entreprise (ex : scénarios de fusion ou d'acquisition).</li>
        </ul>
        <p className='text-xs'>Tous les tiers sont contractuellement tenus de protéger vos informations et de limiter leur utilisation aux fins convenues.</p>
  
        <h2 className="font-semibold text-sm mt-4">9. Transferts internationaux</h2>
        <p className='text-xs'>
          Vos informations peuvent être transférées au Canada, aux États-Unis ou dans d'autres pays où nos prestataires de services opèrent. 
          Nous utilisons des garanties contractuelles ou des mesures équivalentes lorsque requis.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">10. Conservation des données</h2>
        <p className='text-xs'>
          Nous conservons les informations personnelles aussi longtemps que nécessaire pour les fins décrites ici, telles que l'exécution des commandes, la conformité fiscale et le service de garantie. 
          Par exemple, les dossiers de transaction peuvent être conservés jusqu'à 7 ans.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">11. Vos droits</h2>
        <p className='text-xs'>Vous pouvez demander de :</p>
        <ul className="list-none pl-6">
          <li className='text-xs'>Accéder à vos informations personnelles.</li>
          <li className='text-xs'>Corriger ou mettre à jour les inexactitudes.</li>
          <li className='text-xs'>Demander la suppression de vos informations (sous réserve d'exceptions légales).</li>
          <li className='text-xs'>Restreindre ou vous opposer à certains traitements.</li>
          <li className='text-xs'>Retirer votre consentement le cas échéant.</li>
          <li className='text-xs'>Demander une copie portable de vos données.</li>
        </ul>
        <p className='text-xs'>
          Contactez <a href="mailto:info@voguedecor.com" className="underline text-black">info@voguedecor.com</a> pour exercer ces droits. 
          Nous pouvons exiger une vérification d'identité pour traiter les demandes.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">12. Marketing et désabonnement</h2>
        <p className='text-xs'>
          Les emails marketing sont envoyés uniquement lorsque permis ou consenti. Chacun comprend un lien de désabonnement. 
          Vous pouvez également gérer vos préférences dans votre compte ou en contactant le Service client. 
          Les demandes sont traitées dans les 3 jours ouvrables.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">13. Sécurité</h2>
        <p className='text-xs'>
          Nous utilisons le chiffrement, l'hébergement sécurisé et les contrôles d'accès pour protéger vos informations. 
          Aucun système en ligne n'est complètement sécurisé ; si vous soupçonnez un accès non autorisé, contactez-nous immédiatement.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">14. Enfants</h2>
        <p className='text-xs'>
          Nos Services ne s'adressent pas aux enfants de moins de 16 ans. 
          Nous ne collectons pas sciemment leurs informations. 
          Si vous pensez que les données d'un enfant ont été collectées, contactez-nous pour suppression.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">15. Modifications de cette politique</h2>
        <p className='text-xs'>
          Nous pouvons réviser cette Politique pour refléter les changements dans les pratiques, la technologie ou les lois. 
          Les mises à jour apparaîtront ici avec une date d'entrée en vigueur. L'utilisation continue constitue une acceptation.
        </p>
  
        <h2 className="font-semibold text-sm mt-4">16. Contactez-nous</h2>
        <p className='text-xs'>
          Email : <a href="mailto:info@voguedecor.com" className="underline text-black">info@voguedecor.com</a><br />
          Téléphone : +1 (888) 880 8232<br />
          Courrier :<br />
          Vogue Decor<br />
          7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC H4T 1E7<br />
          825 Denison St Unit 2, Markham, ON L3R 5E4
        </p>
      </>
    )
  },  
  {
    id: "shipping",
    label: "Politique de livraison et de retour",
    content: (
      <>
        <p className='text-xs'><strong>Date d'entrée en vigueur :</strong> 2025-10-01</p>

        <h2 className="font-semibold text-sm mt-4">Promotion de livraison gratuite</h2>
        <p className='text-xs'>
          LIVRAISON GRATUITE POUR LES COMMANDES DE PLUS DE 2 999 $ AU CANADA. Les adresses surdimensionnées ou éloignées peuvent être exclues.
        </p>

        <h2 className="font-semibold text-sm mt-4">Méthodes d'expédition et traitement</h2>
        <p className='text-xs'>
          Livraison standard par transporteur pour les articles en boîte ; fret ou service de livraison pour les meubles volumineux. Les commandes sont généralement expédiées dans 1 à 2 jours ouvrables après paiement, sauf indication contraire.
        </p>

        <h2 className="font-semibold text-sm mt-4">Délais de transit estimés</h2>
        <ul className="list-none pl-6">
          <li className='text-xs'>Ontario : 1–3 jours ouvrables</li>
          <li className='text-xs'>Québec : 1–3 jours ouvrables</li>
          <li className='text-xs'>Alberta : 3–7 jours ouvrables</li>
          <li className='text-xs'>Colombie-Britannique : 5–9 jours ouvrables</li>
          <li className='text-xs'>Manitoba : 2–6 jours ouvrables</li>
        </ul>

        <h2 className="font-semibold text-sm mt-4">Ramassage (local)</h2>
        <p className='text-xs'>
          Choisissez « Ramassage » au paiement. Nous enverrons un email lorsque c'est prêt. Lieux :
        </p>
        <ul className="list-none pl-6">
          <li className='text-xs'>Montréal : 7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC</li>
          <li className='text-xs'>Toronto : 825 Denison St Unit 2, Markham, ON (préavis de 2 jours ouvrables requis)</li>
        </ul>

        <h2 className="font-semibold text-sm mt-4">Retours, annulations et remboursements</h2>
        <p className='text-xs'>
          Les retours sont acceptés dans les 14 jours suivant la livraison, sauf indication contraire. Les articles doivent être non utilisés et dans leur emballage d'origine. Les frais de retour sont à la charge du client, sauf en cas d'erreur de notre part.
        </p>
        <p className='text-xs'>
          Contactez info@voguedecor.com pour une autorisation de retour. Les remboursements sont traités dans les 7 jours ouvrables après inspection.
        </p>

        <h2 className="font-semibold text-sm mt-4">Garantie vs retours</h2>
        <p className='text-xs'>
          Les réclamations de garantie couvrent les défauts de fabrication dans les 12 mois suivant la livraison. Contactez info@voguedecor.com avec des photos et le numéro de commande pour examen.
        </p>

        <h2 className="font-semibold text-sm mt-4">Contact pour questions d'expédition</h2>
        <p className='text-xs'>
          Service client : +1 (888) 880-8232<br />
          Email : info@voguedecor.com<br />
          Adresses postales :<br />
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
          alt="Bannière principale"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="mx-auto max-w-9xl px-4 md:px-16 py-6 pt-0 gap-8">
        <div className="mb-4">
          <BreadCrumb currentPage={"Conditions de service"} />
        </div>
        <h1 className="text-3xl font-bold">Conditions de service</h1>
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