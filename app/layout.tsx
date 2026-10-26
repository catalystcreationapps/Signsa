import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://signsa.com'),
  title: {
    default: 'Sign Burger (ساين برجر) | Fresh Angus Burgers & Breakfast in Saudi Arabia',
    template: '%s | Sign Burger (ساين برجر)',
  },
  description:
    'Discover Sign Burger (ساين برجر) — fresh 100% Angus smash burgers, crispy chicken, and morning falafel & halloumi meals. Explore our full menu, 38 branches across Saudi Arabia, and download the official Sign App.',
  keywords: [
    'Sign Burger',
    'Sign Restaurant',
    'ساين برجر',
    'مطعم ساين',
    'Sign Riyadh',
    'Sign Saudi Arabia',
    'fresh burgers Riyadh',
    'Angus beef burger',
    'best burger in Riyadh',
    'Riyadh burger branches',
    'Sign Falafel Meal',
    'Sign Halloumi Meal',
    'Sign Morning Box',
    'Sign Burger menu',
    'Sign Burger app',
  ],
  authors: [{ name: 'Sign Restaurant', url: 'https://signsa.com' }],
  creator: 'Sign Restaurant',
  publisher: 'Sign Restaurant',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: 'https://signsa.com',
  },
  openGraph: {
    title: 'Sign Burger (ساين برجر) | Fresh Burgers & Breakfast Across Saudi Arabia',
    description:
      'Fresh 100% Angus beef smash burgers, crispy chicken meals, and signature morning breakfast across 38 branches in Saudi Arabia. Open daily 6 AM — 4 AM.',
    url: 'https://signsa.com',
    siteName: 'Sign Burger',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/menu/sign-beef-meal.png',
        width: 1200,
        height: 630,
        alt: 'Sign Burger Fresh Angus Beef Meal & Signature Sauce',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign Burger (ساين برجر) | Fresh Angus Burgers & Breakfast',
    description:
      'Fresh 100% Angus beef burgers, crispy chicken, and morning breakfast across 38 branches in Riyadh and Saudi Arabia.',
    images: ['/menu/sign-beef-meal.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'restaurant',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fffaf3' },
    { media: '(prefers-color-scheme: dark)', color: '#17130f' },
  ],
  width: 'device-width',
  initialScale: 1,
}

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'FastFoodRestaurant',
  name: 'Sign Burger',
  alternateName: 'ساين برجر',
  image: 'https://signsa.com/menu/sign-beef-meal.png',
  logo: 'https://signsa.com/sign-logo.webp',
  url: 'https://signsa.com',
  telephone: '+966920033494',
  servesCuisine: ['Burgers', 'American', 'Breakfast', 'Fast Food'],
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'King Fahd Rd, Al Arid',
    addressLocality: 'Riyadh',
    postalCode: '11543',
    addressCountry: 'SA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 24.8118,
    longitude: 46.6111,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '06:00',
      closes: '04:00',
    },
  ],
  menu: 'https://signsa.com/#menu',
  acceptsReservations: 'False',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
