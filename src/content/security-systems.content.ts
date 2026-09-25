/**
 * Copy for the Security Systems page (/services/security-systems).
 * Same principle as site.content.ts — edit here, never in the markup.
 */

export const securitySystems = {

  /** Fixed section rail (xl and up). */
  rail: [
    { icon: 'shield-check', href: '#top', label: 'Overview' },
    { icon: 'video', href: '#systems', label: 'What we install' },
    { icon: 'life-buoy', href: '#request', label: 'Book a survey' },
  ],
  meta: {
    title: 'Security Systems Installation | Rekonstech Consulting and Trading Services',
    description:
      'CCTV surveillance with remote monitoring, intruder alarms, biometric access control and power backup・Surveyed, installed and maintained by Rekonstech.',
  },

  hero: {
    eyebrow: 'Security Systems',
    titleLead: 'Eyes on your',
    titleAccent: 'premises',
    titleTail: 'around the clock',
    copy: 'Surveillance, intrusion detection, access control and backup power specified for your site, installed properly, and watching long after we leave.',
    primaryCta: { label: 'Book a Free Site Survey', href: '#request' },
    secondaryCta: { label: 'See What We Install', href: '#systems' },
    promises: [
      { icon: 'video', label: 'Live view from any device' },
      { icon: 'zap', label: 'Keeps recording through outages' },
      { icon: 'life-buoy', label: 'Maintenance plans available' },
    ],
    /**
     * Two hero cameras. Both photographs have plain backgrounds (open sky, white
     * studio), which is what lets the CSS feather-mask melt them into the
     * gradient instead of showing an obvious rectangle.
     */
    cameras: {
      primary: {
        src: 'https://images.unsplash.com/photo-1589935447067-5531094415d1?auto=format&fit=crop&w=900&q=75',
        alt: 'Bullet surveillance camera mounted against an open sky',
      },
      secondary: {
        src: 'https://images.unsplash.com/photo-1528312635006-8ea0bc49ec63?auto=format&fit=crop&w=800&q=75',
        alt: 'Pan-tilt-zoom dome camera on a wall bracket',
      },
    },
  },

  about: {
    eyebrow: 'About Rekonstech Security',
    title: 'ABOUT US',
    copy: [
      'We have been specifying and installing security systems for Ghanaian businesses, schools, hotels and homes for over a decade. Every job starts with a walk of the site, because no two premises have the same blind spots.',
      'Our engineers install what the survey calls for and not the biggest package we can sell. Cabling is run tidily, every device is labelled, and you are handed the passwords, the apps and the documentation on the day we finish.',
    ],
    image: {
      src: 'https://images.unsplash.com/photo-1654781393394-df3c9a66d0b5?auto=format&fit=crop&w=1000&q=75',
      alt: 'Hand presenting a credential to a wall-mounted access control reader',
    },
    stats: [
      { value: '15+', label: 'Years installing' },
      { value: '24/7', label: 'Monitoring & support' },
    ],
  },

  systems: {
    eyebrow: 'What We Install',
    title: 'Four systems,',
    titleAccent: 'one integrated site.',
    copy: 'Most break-ins exploit the gap between systems that were never designed to talk to each other. We plan them together.',
    items: [
      {
        icon: 'video',
        title: 'CCTV Surveillance Systems',
        image: {
          src: 'https://images.unsplash.com/photo-1549109926-58f039549485?auto=format&fit=crop&w=800&q=72',
          alt: 'White dome surveillance camera fixed to an exterior wall',
        },
        summary: 'HD and 4K coverage with remote monitoring you can actually use.',
        features: [
          'Camera positions planned from a site survey, not guesswork',
          'Live and recorded view from phone, tablet or desktop',
          'Night vision and motion alerts configured per zone',
          'Storage sized to the retention period you need',
        ],
        outcome: 'Typical install: 1 – 3 days',
      },
      {
        icon: 'bell',
        title: 'Intruder Alarm Systems',
        image: {
          src: 'https://images.unsplash.com/photo-1697382608786-bcf4c113b86e?auto=format&fit=crop&w=800&q=72',
          alt: 'Illuminated alarm keypad mounted beside a doorway',
        },
        summary: 'Zoned detection that tells you what happened and where.',
        features: [
          'Door, window and motion sensors mapped to zones',
          'Instant alerts to your phone and keyholders',
          'Panic buttons and silent alarm options',
          'Tamper detection on every device',
        ],
        outcome: 'Typical install: 1 – 2 days',
      },
      {
        icon: 'scan-face',
        title: 'Biometric Access Control',
        image: {
          src: 'https://images.unsplash.com/photo-1599770643145-3d8045e732e7?auto=format&fit=crop&w=800&q=72',
          alt: 'Access control keypad and fingerprint reader',
        },
        summary: 'Fingerprint and facial recognition for doors and attendance.',
        features: [
          'Fingerprint, facial recognition or card, per door',
          'Time and attendance reporting for payroll',
          'Access levels by person, door and schedule',
          'Audit trail of every entry and attempt',
        ],
        outcome: 'Typical install: 1 – 4 days',
      },
      {
        icon: 'zap',
        title: 'Power Backup Systems',
        image: {
          src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=72',
          alt: 'Rack-mounted power and backup equipment',
        },
        summary: 'Security that does not switch off when the lights do.',
        features: [
          'UPS sized to hold cameras, alarms and recorders',
          'Solar integration for long outages',
          'Automatic changeover with no gap in recording',
          'Battery health checks on every service visit',
        ],
        outcome: 'Typical install: 1 – 2 days',
      },
    ],
  },

  coverage: {
    eyebrow: 'Where We Install',
    title: 'Sites we know',
    titleAccent: 'inside out.',
    copy: 'Every environment has its own blind spots and its own rules. These are the ones we work in most.',
    places: [
      { icon: 'briefcase', label: 'Offices & Businesses' },
      { icon: 'package', label: 'Warehouses & Yards' },
      { icon: 'users', label: 'Hotels & Hospitality' },
      { icon: 'graduation-cap', label: 'Schools & Campuses' },
      { icon: 'heart', label: 'Hospitals & Clinics' },
      { icon: 'map-pin', label: 'Homes & Estates' },
    ],
  },

  process: {
    eyebrow: 'How We Work',
    title: 'Surveyed first,',
    titleAccent: 'quoted in writing.',
    copy: 'Nobody can price a security system over the phone. We walk the site, then put the plan on paper.',
    steps: [
      {
        title: 'Site Survey',
        body: 'We walk the premises with you, identify blind spots and entry points, and agree what actually needs covering.',
      },
      {
        title: 'System Design',
        body: 'Camera positions, cable routes, power and storage are planned and quoted as one itemised document.',
      },
      {
        title: 'Installation',
        body: 'Clean cabling, tidy terminations, no drilled holes we did not agree. Work is done around your operating hours.',
      },
      {
        title: 'Commissioning',
        body: 'Every camera aimed and focused, every zone tested, apps configured on your devices before we hand over.',
      },
      {
        title: 'Maintenance',
        body: 'Scheduled checks on lenses, batteries and storage, with a call-out response time agreed in writing.',
      },
    ],
  },

  ctaBand: {
    title: 'Not sure what your site needs?',
    titleAccent: 'The survey is free.',
    copy: 'We will walk the premises, mark the blind spots and quote the work in writing. Whether or not you go ahead with us.',
  },
};
