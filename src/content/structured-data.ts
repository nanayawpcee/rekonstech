import { site } from './site.content';

/**
 * schema.org LocalBusiness/ProfessionalService markup, rendered on every page.
 * Add `sameAs` (social profile URLs) and a street address once they exist;
 * both strengthen the Google Business Profile match.
 */
export function buildOrganizationSchema(description: string) {
  const { company, siteUrl } = site;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#organization`,
    name: company.legalName,
    alternateName: company.name,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/img/logo-full.png`,
    image: `${siteUrl}${site.hero.image.src}`,
    description,
    telephone: company.phone,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Accra',
      addressRegion: 'Greater Accra',
      addressCountry: 'GH',
    },
    areaServed: { '@type': 'Country', name: 'Ghana' },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
  };
}
