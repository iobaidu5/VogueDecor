"use client";

import BreadCrumb from 'components/breadCrum';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const tabs = [
  {
    id: 'terms',
    label: 'Conditions',
    content: (
      <>
        <p className='font-sm'><strong>VOGUE DECOR</strong></p>
        <p className='font-sm'><strong>Date d'entrée en vigueur :</strong> AAAA-MM-JJ</p>

        <h2 className="font-semibold text-lg mt-4">1. Acceptation des conditions</h2>
        <p className='font-sm'>
          Bienvenue sur le site web Vogue Decor, <strong>vogue-decor.com</strong> (le « Site »). Le Site est exploité par Vogue Decor (la « Société », « nous », « notre »). Chaque personne qui accède et/ou utilise le Site (chaque « Utilisateur », « vous », « votre ») doit lire attentivement ces Conditions de service (« Conditions ») avant d'utiliser le Site. En accédant ou en utilisant le Site, vous signifiez que vous avez lu, compris et acceptez d'être lié par ces Conditions, que vous soyez un utilisateur enregistré ou non.
        </p>
        <p className='font-sm'><strong>SI VOUS N'ACCEPTEZ PAS CES CONDITIONS, VEUILLEZ NE PAS UTILISER LA PLATEFORME.</strong></p>
        <p className='font-sm'>
          Nous pouvons mettre à jour ces Conditions à tout moment en publiant les Conditions modifiées sur le Site ; ces modifications prendront effet une fois publiées. Votre accès continu au Site ou votre utilisation de celui-ci après la publication des modifications constitue votre acceptation des Conditions mises à jour. Nous pouvons ajouter, supprimer ou modifier les fonctionnalités du Site à tout moment sans préavis.
        </p>
        <p className='font-sm'>Aucune application mobile n'est disponible pour le moment. La Société ne gère que le Site et les plateformes de médias sociaux.</p>

        <h2 className="font-semibold text-lg mt-4">2. Inscription au compte et sécurité</h2>
        <p className='font-sm'>
          Vous pouvez créer un compte pour accélérer le processus de paiement et stocker des adresses. Gardez vos identifiants confidentiels. Vous êtes responsable de toute activité sous votre compte. Déconnectez-vous lorsque vous utilisez un ordinateur public et notifiez immédiatement le service client si vous soupçonnez un accès non autorisé.
        </p>

        <h2 className="font-semibold text-lg mt-4">3. Commandes et formation du contrat</h2>
        <p className='font-sm'>
          Le placement d'une commande sur le Site constitue une offre d'achat des biens listés. Nous accuserons réception par courriel. Un contrat contraignant n'est formé que lorsque nous envoyons une confirmation de commande ou un avis d'expédition. Nous nous réservons le droit d'annuler ou de refuser les commandes pour toute raison, y compris les erreurs de prix ou d'inventaire.
        </p>

        <h2 className="font-semibold text-lg mt-4">4. Prix et paiement</h2>
        <p className='font-sm'>
          Les prix sur le Site sont indiqués en CAD sauf indication contraire et excluent les taxes applicables et les frais d'expédition, sauf indication explicite. Les taxes finales et les frais d'expédition sont calculés à la caisse. Nous acceptons les modes de paiement affichés à la caisse. Si une erreur de prix est identifiée, nous pouvons annuler la commande et rembourser tout montant déjà payé.
        </p>

        <h2 className="font-semibold text-lg mt-4">5. Expédition et cueillette (résumé)</h2>
        <p className='font-sm'><strong>Promotion de livraison gratuite :</strong> LIVRAISON GRATUITE SUR LES COMMANDES DE PLUS DE 2 999 $ AU CANADA (promotion).</p>
        <p className='font-sm'><strong>Livraison et transit :</strong> Délais de transit typiques des transporteurs (jours ouvrables) :</p>
        <ul className="list-disc pl-6">
          <li>Ontario et Québec : 1-3</li>
          <li>Alberta : 3-7</li>
          <li>Colombie-Britannique : 5-9</li>
        </ul>
        <p className='font-sm'>Les délais de transit sont des estimations et peuvent varier.</p>
        <p className='font-sm'>
          <strong>Cueillette :</strong> Disponible à Montréal (7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC) et Toronto (825 Denison St Unit 2, Markham, ON). La cueillette à Toronto peut nécessiter un préavis de 2 jours ouvrables.
        </p>
        <p className='font-sm'>
          <strong>Articles surdimensionnés / fret :</strong> Les articles volumineux ou palettisés peuvent être expédiés via des transporteurs de fret/LTL ou de service blanc et peuvent entraîner des frais supplémentaires. Nous vous informerons avant l'expédition si des arrangements de fret ou des frais supplémentaires s'appliquent.
        </p>
        <p className='font-sm'>
          <strong>Coûts d'expédition et titre :</strong> Les coûts d'expédition varient selon l'article et la destination ; les frais d'expédition finaux sont indiqués à la caisse. Le titre et le risque de perte sont transférés conformément à la Politique d'expédition (voir le lien ci-dessous).
        </p>
        <p className='font-sm'>Voir notre politique d'expédition complète : <em>Lien</em></p>

        <h2 className="font-semibold text-lg mt-4">6. Retours, annulations et remboursements</h2>
        <p className='font-sm'>
          Les retours et échanges sont régis par notre Politique de retours : <em>Lien</em>. Délai de retour standard : 14 jours après la livraison pour les articles admissibles, sauf si une période difféente est indiquée au moment de l'achat. Les commandes personnalisées ou commerciales peuvent être non remboursables ou soumises à des conditions d'annulation spéciales divulguées lors de la confirmation de commande. Les remboursements sont émis sur le mode de paiement d'origine une fois que les articles retournés sont reçus et inspectés.
        </p>

        <h2 className="font-semibold text-lg mt-4">7. Garantie et entretien des produits</h2>
        <p className='font-sm'>
          Nous garantissons que nos produits sont exempts de défauts de fabrication pendant la période de garantie indiquée sur la page du produit. Si aucune période n'est spécifiée, la garantie par défaut est de 12 mois à partir de la livraison. L'usure normale, les mauvais traitements, les dommages accidentels ou les modifications ne sont pas couverts. Les recours en garantie sont limités à la réparation, au remplacement ou au remboursement à notre discrétion. Contactez le service client pour plus d'informations.
        </p>

        <h2 className="font-semibold text-lg mt-4">8. Limitation de responsabilité et indemnisation</h2>
        <p className='font-sm'>
          Dans la mesure maximale permise par la loi, notre responsabilité pour toute réclamation découlant de votre achat ou utilisation de produits est limitée au prix d'achat des produits concernés. Nous ne sommes pas responsables des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs. Vous acceptez d'indemniser et de dégager Vogue Decor de toute responsabilité concernant les réclamations découlant de votre mauvaise utilisation des produits ou de votre violation de ces Conditions.
        </p>

        <h2 className="font-semibold text-lg mt-4">9. Propriété intellectuelle</h2>
        <p className='font-sm'>
          Tout le contenu du Site, texte, images, conceptions, marques de commerce et code sont la propriété de Vogue Decor ou sont utilisés sous licence. Vous ne pouvez pas reproduire, distribuer ou créer des œuvres dérivées de notre contenu sans autorisation écrite préalable.
        </p>

        <h2 className="font-semibold text-lg mt-4">10. Confidentialité et témoins</h2>
        <p className='font-sm'>
          Notre Politique de confidentialité explique comment nous collectons et utilisons les données personnelles. En utilisant le Site, vous consentez à notre collecte et traitement des données comme décrit dans la Politique de confidentialité : /privacy (lien).
        </p>

        <h2 className="font-semibold text-lg mt-4">11. Loi applicable et règlement des différends</h2>
        <p className='font-sm'>
          Ces Conditions sont régies par les lois de la province de Québec et les lois fédérales du Canada applicables.
        </p>

        <h2 className="font-semibold text-lg mt-4">12. Langue (Québec)</h2>
        <p className='font-sm'>
          Si vous êtes un consommateur dans la province de Québec, vous pouvez demander une version française de ces Conditions. Une version française officielle est disponible sur demande et sera publiée sur le Site.
        </p>

        <h2 className="font-semibold text-lg mt-4">13. Modifications des conditions</h2>
        <p className='font-sm'>
          Nous pouvons mettre à jour ces Conditions ; les modifications importantes seront publiées ici avec une date d'entrée en vigueur mise à jour.
        </p>

        <h2 className="font-semibold text-lg mt-4">14. Contact et questions</h2>
        <p className='font-sm'>Service client : +1 (888) 880-8232</p>
        <p className='font-sm'>Courriel : info@voguedecor.com</p>
        <p className='font-sm'>Adresses postales : 7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC H4T 1E7</p>
      </>
    )
  },
  {
    id: 'privacy',
    label: 'Confidentialité',
    content: (
      <>
        <p className='font-sm'><strong>VOGUE DECOR</strong></p>
        <p className='font-sm'><strong>Date d'entrée en vigueur :</strong> AAAA-MM-JJ</p>
  
        <h2 className="font-semibold text-lg mt-4">1. Introduction</h2>
        <p className='font-sm'>
          Bienvenue sur le site web Vogue Decor, <strong>vogue-decor.com</strong> (le « Site Web »). Le Site Web et les services en ligne connexes (les « Services ») sont exploités par Vogue Decor (la « Société », « nous », « notre »). 
          Nous respectons la confidentialité et la sécurité de vos informations personnelles (« Informations ») et nous nous engageons à les traiter de manière responsable.
        </p>
        <p className='font-sm'>
          Cette Politique de confidentialité explique quelles Informations nous collectons lorsque vous utilisez les Services, comment nous utilisons et partageons ces Informations, les bases légales du traitement le cas échéant, et les choix et droits qui vous sont disponibles.
        </p>
        <p className='font-sm'>
          Nous pouvons mettre à jour cette Politique de temps à autre. Les modifications importantes seront publiées ici avec une date d'entrée en vigueur mise à jour ; lorsque la loi l'exige, nous vous en informerons par courriel. En utilisant les Services après la publication des mises à jour, vous consentez à la Politique révisée.
        </p>
        <p className='font-sm'><strong>Note :</strong> Vogue Decor n'exploite actuellement aucune application mobile. Les « Services » font référence à notre site web et à nos canaux en ligne/médias sociaux.</p>
  
        <h2 className="font-semibold text-lg mt-4">2. Responsable et informations de contact</h2>
        <p className='font-sm'><strong>Responsable :</strong> Vogue Decor Inc.</p>
        <p className='font-sm'><strong>Contact confidentialité :</strong> info@voguedecor.com</p>
        <p className='font-sm'><strong>Téléphone :</strong> +1 (888) 880-8232</p>
        <p className='font-sm'>
          <strong>Adresses :</strong><br />
          7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC H4T 1E7<br />
          825 Denison St Unit 2, Markham, ON L3R 5E4
        </p>
  
        <h2 className="font-semibold text-lg mt-4">3. Portée et focus géographique</h2>
        <p className='font-sm'>
          Cette Politique s'applique aux informations personnelles collectées via les Services et les interactions clients connexes. Elle est rédigée pour se conformer aux lois canadiennes sur la confidentialité. 
          Si vous êtes situé à l'extérieur du Canada ou des États-Unis, vos informations peuvent être transférées vers ces régions.
        </p>
  
        <h2 className="font-semibold text-lg mt-4">4. Informations que nous collectons</h2>
        <ul className="list-disc pl-6">
          <li>Identité et contact : nom, nom de l'entreprise, courriel, téléphone, adresses de facturation et de livraison.</li>
          <li>Compte et identifiants : nom d'utilisateur, mot de passe haché, paramètres du compte.</li>
          <li>Données de transaction : historique des commandes, factures, retours, réclamations de garantie.</li>
          <li>Données techniques et d'utilisation : adresse IP, navigateur, appareil, données d'analyse.</li>
          <li>Marketing et engagement : préférences, activité courriel, statut d'opt-in.</li>
          <li>Support client : communications, notes de livraison, informations de garantie.</li>
          <li>Sources tierces et publiques : médias sociaux ou partenaires (lorsque permis).</li>
        </ul>
  
        <h2 className="font-semibold text-lg mt-4">5. Comment nous utilisons vos informations</h2>
        <ul className="list-disc pl-6">
          <li>Pour traiter les commandes, paiements, expéditions et retours.</li>
          <li>Pour fournir le service client et répondre aux demandes.</li>
          <li>Pour exploiter, améliorer et sécuriser le Site Web et les Services.</li>
          <li>Pour envoyer des confirmations de commande et, lorsque permis, des courriels marketing.</li>
          <li>Pour prévenir la fraude et se conformer aux obligations légales.</li>
        </ul>
  
        <h2 className="font-semibold text-lg mt-4">6. Base légale du traitement</h2>
        <ul className="list-disc pl-6">
          <li><strong>Contrat et exécution :</strong> Pour exécuter vos achats.</li>
          <li><strong>Consentement :</strong> Pour le marketing facultatif ou les témoins.</li>
          <li><strong>Intérêts légitimes :</strong> Pour la sécurité, l'analyse et l'amélioration du service.</li>
          <li><strong>Conformité légale :</strong> Pour la tenue de dossiers et les demandes légales.</li>
        </ul>
  
        <h2 className="font-semibold text-lg mt-4">7. Témoins et technologies de suivi</h2>
        <p className='font-sm'>
          Nous utilisons des témoins et des outils similaires pour la fonctionnalité, l'analyse et le marketing. Vous pouvez gérer les préférences de témoins via la bannière de témoins ou votre navigateur. 
          Voir notre Politique sur les témoins pour plus de détails sur les fournisseurs tels que Google Analytics, Facebook Pixel et Klaviyo.
        </p>
  
        <h2 className="font-semibold text-lg mt-4">8. Partage et divulgation</h2>
        <ul className="list-disc pl-6">
          <li>Fournisseurs de services (ex. : livraison, hébergement, paiement, analyse).</li>
          <li>Conseillers professionnels (ex. : juridique, comptabilité, audit).</li>
          <li>Forces de l'ordre ou régulateurs lorsque requis par la loi.</li>
          <li>Transferts d'entreprise (ex. : scénarios de fusion ou d'acquisition).</li>
        </ul>
        <p className='font-sm'>Tous les tiers sont contractuellement tenus de protéger vos informations et de limiter leur utilisation aux fins convenues.</p>
  
        <h2 className="font-semibold text-lg mt-4">9. Transferts internationaux</h2>
        <p className='font-sm'>
          Vos informations peuvent être transférées au Canada, aux États-Unis ou dans d'autres pays où nos fournisseurs de services opèrent. 
          Nous utilisons des garanties contractuelles ou des mesures équivalentes lorsque requis.
        </p>
  
        <h2 className="font-semibold text-lg mt-4">10. Conservation des données</h2>
        <p className='font-sm'>
          Nous conservons les informations personnelles aussi longtemps que nécessaire aux fins décrites ici, telles que l'exécution des commandes, la conformité fiscale et le service de garantie. 
          Par exemple, les dossiers de transaction peuvent être conservés jusqu'à 7 ans.
        </p>
  
        <h2 className="font-semibold text-lg mt-4">11. Vos droits</h2>
        <p className='font-sm'>Vous pouvez demander de :</p>
        <ul className="list-disc pl-6">
          <li>Accéder à vos informations personnelles.</li>
          <li>Corriger ou mettre à jour les inexactitudes.</li>
          <li>Demander la suppression de vos informations (sous réserve d'exceptions légales).</li>
          <li>Restreindre ou vous opposer à certains traitements.</li>
          <li>Retirer votre consentement le cas échéant.</li>
          <li>Demander une copie portable de vos données.</li>
        </ul>
        <p className='font-sm'>
          Contactez <a href="mailto:info@voguedecor.com" className="underline">info@voguedecor.com</a> pour exercer ces droits. 
          Nous pouvons exiger une vérification d'identité pour traiter les demandes.
        </p>
  
        <h2 className="font-semibold text-lg mt-4">12. Marketing et désabonnement</h2>
        <p className='font-sm'>
          Les courriels marketing sont envoyés uniquement lorsque permis ou consenti. Chacun comprend un lien de désabonnement. 
          Vous pouvez également gérer vos préférences dans votre compte ou en contactant le service client. 
          Les demandes sont traitées dans les 3 jours ouvrables.
        </p>
  
        <h2 className="font-semibold text-lg mt-4">13. Sécurité</h2>
        <p className='font-sm'>
          Nous utilisons le chiffrement, l'hébergement sécurisé et les contrôles d'accès pour protéger vos informations. 
          Aucun système en ligne n'est complètement sécurisé ; si vous soupçonnez un accès non autorisé, contactez-nous immédiatement.
        </p>
  
        <h2 className="font-semibold text-lg mt-4">14. Enfants</h2>
        <p className='font-sm'>
          Nos Services ne s'adressent pas aux enfants de moins de 16 ans. 
          Nous ne collectons pas sciemment leurs informations. 
          Si vous croyez que les données d'un enfant ont été collectées, contactez-nous pour suppression.
        </p>
  
        <h2 className="font-semibold text-lg mt-4">15. Modifications de cette politique</h2>
        <p className='font-sm'>
          Nous pouvons réviser cette Politique pour refléter les changements dans les pratiques, la technologie ou les lois. 
          Les mises à jour apparaîtront ici avec une date d'entrée en vigueur. L'utilisation continue constitue l'acceptation.
        </p>
  
        <h2 className="font-semibold text-lg mt-4">16. Contactez-nous</h2>
        <p className='font-sm'>
          Courriel : <a href="mailto:info@voguedecor.com" className="underline">info@voguedecor.com</a><br />
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
    label: "Politique de livraison et retours",
    content: (
      <>
        <p><strong>POLITIQUE DE LIVRAISON ET DE RETOURS</strong></p>
        <p><strong>Date d'entrée en vigueur :</strong> AAAA-MM-JJ</p>

        <h2 className="font-semibold text-lg mt-4">Promotion de livraison gratuite</h2>
        <p>
          LIVRAISON GRATUITE SUR LES COMMANDES DE PLUS DE 2 999 $ AU CANADA. Les adresses surdimensionnées ou éloignées peuvent être exclues.
        </p>

        <h2 className="font-semibold text-lg mt-4">Méthodes d'expédition et traitement</h2>
        <p>
          Livraison standard par transporteur pour les articles en boîte ; fret ou service blanc pour les meubles volumineux. Les commandes sont généralement expédiées dans les 1 à 2 jours ouvrables après paiement, sauf indication contraire.
        </p>

        <h2 className="font-semibold text-lg mt-4">Délais de transit estimés</h2>
        <ul className="list-disc pl-6">
          <li>Ontario : 1-3 jours ouvrables</li>
          <li>Québec : 1-3 jours ouvrables</li>
          <li>Alberta : 3-7 jours ouvrables</li>
          <li>Colombie-Britannique : 5-9 jours ouvrables</li>
          <li>Manitoba : 2-6 jours ouvrables</li>
        </ul>

        <h2 className="font-semibold text-lg mt-4">Cueillette (locale)</h2>
        <p>
          Choisissez « Cueillette » à la caisse. Nous vous enverrons un courriel lorsque ce sera prêt. Lieux :
        </p>
        <ul className="list-disc pl-6">
          <li>Montréal : 7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC</li>
          <li>Toronto : 825 Denison St Unit 2, Markham, ON (préavis de 2 jours ouvrables requis)</li>
        </ul>

        <h2 className="font-semibold text-lg mt-4">Retours, annulations et remboursements</h2>
        <p>
          Les retours sont acceptés dans les 14 jours suivant la livraison, sauf indication contraire. Les articles doivent être non utilisés et dans leur emballage d'origine. Les frais de retour sont à la charge du client, sauf en cas d'erreur de notre part.
        </p>
        <p>
          Contactez info@voguedecor.com pour une autorisation de retour. Les remboursements sont traités dans les 7 jours ouvrables après inspection.
        </p>

        <h2 className="font-semibold text-lg mt-4">Garantie vs retours</h2>
        <p>
          Les réclamations de garantie couvrent les défauts de fabrication dans les 12 mois suivant la livraison. Contactez info@voguedecor.com avec des photos et le numéro de commande pour examen.
        </p>

        <h2 className="font-semibold text-lg mt-4">Contact pour questions d'expédition</h2>
        <p>
          Service client : +1 (888) 880-8232<br />
          Courriel : info@voguedecor.com<br />
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
          alt="Hero Banner"
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
          <h1 className="mb-6 text-2xl font-bold text-black-700">
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