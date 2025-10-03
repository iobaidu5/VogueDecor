'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

export default function PathnameScripts() {
  const pathname = usePathname()

  const breadcrumbMap: Record<string, any> = {
    '/chairs': {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.voguedecor.com/" },
        { "@type": "ListItem", "position": 2, "name": "Chairs", "item": "https://www.voguedecor.com/chairs" }
      ]
    },
    '/barstools': {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.voguedecor.com/" },
        { "@type": "ListItem", "position": 2, "name": "Barstools", "item": "https://www.voguedecor.com/barstools" }
      ]
    },
    '/table-tops': {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.voguedecor.com/" },
        { "@type": "ListItem", "position": 2, "name": "Table Tops", "item": "https://www.voguedecor.com/table-tops" }
      ]
    },
    '/table-bases': {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.voguedecor.com/" },
        { "@type": "ListItem", "position": 2, "name": "Table Bases", "item": "https://www.voguedecor.com/table-bases" }
      ]
    },
    '/outdoor-furniture': {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.voguedecor.com/" },
        { "@type": "ListItem", "position": 2, "name": "Outdoor Furniture", "item": "https://www.voguedecor.com/outdoor-furniture" }
      ]
    }
  }

  const schema = breadcrumbMap[pathname]
  if (!schema) return null

  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
