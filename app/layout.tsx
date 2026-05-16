import type { Metadata } from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HyK Travel — Agencia de Viajes en Madrid | Lunas de miel, Familias, Grupos, Singles',
  description: 'Agencia de viajes en Madrid con atención 24h. Especializados en lunas de miel, viajes en familia, grupos, singles, viajes +55 y corporativos. Presupuesto sin compromiso. ☎ 648 659 370',
  keywords: 'agencia de viajes Madrid, luna de miel Madrid, viajes en familia Madrid, viajes singles Madrid, viajes grupos Madrid, viajes mayores 55 Madrid, agencia viajes corporativos Madrid, lista de boda viaje, viajes con mascotas Madrid, HyK Travel',
  authors: [{ name: 'HyK Travel' }],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://hyktravel.es/',
  },
  openGraph: {
    type: 'website',
    url: 'https://hyktravel.es/',
    title: 'HyK Travel — Agencia de Viajes en Madrid',
    description: 'Lunas de miel, familias, grupos, singles y viajes +55. Asesoramiento personalizado 24h desde Madrid. ¡Pide tu presupuesto sin compromiso!',
    siteName: 'HyK Travel',
    images: [{
      url: 'https://hyktravel.es/og-image.jpg',
    }],
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HyK Travel — Agencia de Viajes en Madrid',
    description: 'Lunas de miel, familias, grupos, singles y viajes +55. Asesoramiento 24h desde Madrid.',
    images: ['https://hyktravel.es/og-image.jpg'],
  },
  other: {
    'geo.region': 'ES-MD',
    'geo.placename': 'Madrid',
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://hyktravel.es/#organization",
      "name": "HyK Travel",
      "url": "https://hyktravel.es",
      "description": "Agencia de viajes en Madrid especializada en lunas de miel, viajes en familia, grupos, singles, viajes +55 y corporativos. Atención personalizada 24 horas.",
      "telephone": "+34648659370",
      "email": "info@hyktravel.es",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Madrid",
        "addressRegion": "Comunidad de Madrid",
        "addressCountry": "ES"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "sameAs": ["https://www.instagram.com/hyktravel.es/"],
      "priceRange": "€€",
      "areaServed": { "@type": "Country", "name": "España" },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Tipos de viajes",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Luna de miel"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Viajes en familia"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Viajes en grupo"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Viajes singles"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Viajes +55"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Viajes corporativos"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Lista de boda viaje"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Viajes con mascotas"}}
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Dónde está HyK Travel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "HyK Travel es una agencia de viajes en Madrid con atención personalizada 24 horas por teléfono, WhatsApp y email."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué tipos de viajes organiza HyK Travel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "HyK Travel organiza lunas de miel, viajes en familia, viajes en grupo, viajes singles, viajes para mayores de 55 años, viajes corporativos, listas de boda viaje y viajes con mascotas."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo puedo contactar con HyK Travel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Puedes contactarnos por teléfono o WhatsApp en el 648 659 370, por email en info@hyktravel.es, o a través de nuestra web. Respondemos 24 horas al día."
          }
        },
        {
          "@type": "Question",
          "name": "¿HyK Travel organiza lunas de miel a Maldivas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí, somos especialistas en lunas de miel a Maldivas, Santorini, Caribe y otros destinos paradisíacos. Diseñamos el viaje a medida incluyendo vuelos, hotel 5 estrellas y traslados."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cuánto cuesta un viaje con HyK Travel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Los precios varían según destino y tipo de viaje. Ofrecemos presupuesto personalizado sin compromiso, desde 590€ por persona."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
