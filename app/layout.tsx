// app/layout.tsx
import { Poppins } from 'next/font/google'
import { CartProvider } from 'components/cart/cart-context'
import { cookies } from 'next/headers'
import { getCart } from 'lib/shopify'
import { ReactNode } from 'react'
import './globals.css'
import { CurrencyProvider } from 'components/currency/currencyContext'
import CookieConsent from 'components/CookieConsent'
import EmailSubscriptionModal from 'components/EmailSubscriptionModal'
import { Toaster } from 'sonner'
import ChatbaseScript from 'components/ChatbaseScript'
import Script from 'next/script'
import { CollectionProvider } from 'lib/CollectionContext'
import GoogleTagManager from 'components/GoogleTag'
import PathnameScripts from './PathnameScripts'

export const metadata = {
  title: 'Vogue Decor – Restaurant Chairs, Tables & Furniture',
  description:
    'Shop restaurant chairs, tables, barstools & table bases. Vogue Decor delivers premium restaurant furniture across the USA & Canada.',
  openGraph: {
    type: 'website',
  },
  icons: {
    icon: './favicon.ico',
  },
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const cartId = (await cookies()).get('cartId')?.value
  const cart = getCart(cartId)

  // ---- Common JSON-LD Schemas ----
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vogue Decor",
    "url": "https://www.voguedecor.com",
    "logo": "https://www.voguedecor.com/wp-content/uploads/2024/01/voguedecor-logo.png",
    "description":
      "Vogue Decor is a Canadian supplier of high-quality restaurant furniture, including restaurant chairs, tables, barstools, booths, and outdoor furniture. Serving Montreal, Toronto, and across North America.",
    "sameAs": [
      "https://www.facebook.com/VogueDecorFurniture",
      "https://www.instagram.com/voguedecorr"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-514-823-5595",
      "contactType": "customer service",
      "areaServed": "CA",
      "availableLanguage": ["en", "fr"]
    },
    "department": [
      {
        "@type": "FurnitureStore",
        "name": "Vogue Decor Montreal",
        "image": "https://www.voguedecor.com/wp-content/uploads/2024/01/montreal-showroom.jpg",
        "description":
          "Visit our Montreal showroom for premium restaurant furniture including restaurant chairs, tables, booths, and barstools.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "7550 Chemin de la Côte-de-Liesse",
          "addressLocality": "Saint-Laurent",
          "addressRegion": "QC",
          "postalCode": "H4T 1E7",
          "addressCountry": "CA"
        },
        "telephone": "+1-514-823-5595",
        "email": "info@voguedecor.com",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "16:00"
          }
        ]
      },
      {
        "@type": "FurnitureStore",
        "name": "Vogue Decor Toronto",
        "image": "https://www.voguedecor.com/wp-content/uploads/2024/01/toronto-showroom.jpg",
        "description":
          "Our Toronto showroom offers restaurant furniture for cafes, hotels, and dining spaces, including restaurant tables, chairs, and outdoor collections.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "825 Denison St Unit 2",
          "addressLocality": "Markham",
          "addressRegion": "ON",
          "postalCode": "L3R 5E4",
          "addressCountry": "CA"
        },
        "telephone": "+1-416-560-5575",
        "email": "info@voguedecor.com",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "10:00",
            "closes": "16:00"
          }
        ]
      },

    ]
  }

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.voguedecor.com",
    "name": "Vogue Decor - Restaurant Furniture Online Store",
    "description":
      "Shop restaurant furniture online at Vogue Decor. Discover restaurant chairs, tables, booths, and outdoor dining furniture shipped across Canada and the USA.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.voguedecor.com/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <html lang={params.locale} className={poppins.variable}>
      <head>
        <meta
          name="google-site-verification"
          content="3_4p_Iwcpg350S4xRemSlkguA-eA5_v8XkW8DF9Ebqw"
        />
        <link rel="icon" href="//favicon.ico" sizes="any" />

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* GTM */}
        <Script id="gtm" strategy="beforeInteractive">
          {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PNZ7MNJM');
          `}
        </Script>

        {/* Google Translate */}
        <Script
          id="google-translate"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'en,fr',
                  autoDisplay: false
                },
                'google_translate_element'
              );
            }
            window.googleTranslateElementInit = googleTranslateElementInit;
          `}
        </Script>

        {/* Common JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />

        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "v2wymqqhoa");
            `,
          }}
        />

        {/* Page-specific breadcrumbs */}
        <PathnameScripts />
      </head>

      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PNZ7MNJM"
            height={0}
            width={0}
            style={{ display: 'none', visibility: 'hidden' }}
            title="GTM"
          />
        </noscript>
        <div id="google_translate_element" style={{ display: 'none' }} />

        <ChatbaseScript />
        <CartProvider cartPromise={cart}>
          <CurrencyProvider>
            <EmailSubscriptionModal />
            <CollectionProvider>
              <main>{children}</main>
            </CollectionProvider>
            <CookieConsent />
            <Toaster position="top-right" richColors />
          </CurrencyProvider>
        </CartProvider>
      </body>
    </html>
  )
}
