import type { Metadata } from 'next';
import './globals.css';
import { getSiteSettings } from '@/lib/data';
import { ConsultationModal } from '@/components/ConsultationModal';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title =
    settings?.default_seo_title ||
    'H&S Auditors | Premier Accounting, Tax & Audit Consultancy - India';
  const description =
    settings?.default_seo_description ||
    'Professional accounting, taxation and compliance solutions with deep expertise in GST, Income Tax, Bookkeeping, Audit & Assurance and Business Registration across India.';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: '%s | H&S Auditors',
    },
    description,
    icons: {
      icon: '/logo.png',
      apple: '/logo.png',
    },
    keywords: [
      'H&S Auditors',
      'Chartered Accountants',
      'GST Filing India',
      'Income Tax Consultancy',
      'Bookkeeping and Accounting',
      'Statutory Audit Kerala',
      'Company Incorporation',
      'ROC Filings',
      'Tax Consultants Palakkad Ottapalam',
    ],
    authors: [{ name: 'H&S Auditors' }],
    creator: 'H&S Auditors',
    publisher: 'H&S Auditors',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: siteUrl,
      siteName: 'H&S Auditors',
      title,
      description,
      images: [
        {
          url: `${siteUrl}/images/hero-accounting-team.svg`,
          width: 1200,
          height: 630,
          alt: 'H&S Auditors Accounting & Tax Consultancy',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/images/hero-accounting-team.svg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  // Structured Data (JSON-LD) for LocalBusiness / Organization
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: settings?.company_name || 'H&S Auditors',
    description:
      settings?.default_seo_description ||
      'Premier Accounting & Tax Consultancy in India offering GST, Income Tax, Audit, and Business Solutions.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hsauditors.com',
    telephone: settings?.phone || '+91 97461 35644',
    email: settings?.email || 'info@hsauditors.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Room No.48, Harisree Square',
      addressLocality: 'Ottapalam',
      addressRegion: 'Kerala',
      postalCode: '679101',
      addressCountry: 'IN',
    },
    priceRange: '₹₹',
    openingHours: 'Mo,Tu,We,Th,Fr,Sa 09:30-18:00',
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Lora:ital,wght@0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-brand-text">
        {children}
        <ConsultationModal />
      </body>
    </html>
  );
}
