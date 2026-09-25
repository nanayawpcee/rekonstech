/**
 * Copy for the Consultancy Services page (/services/consultancy).
 * Same principle as site.content.ts — edit here, never in the markup.
 */

export const consultancy = {

  /** Fixed section rail (xl and up). */
  rail: [
    { icon: 'lightbulb', href: '#top', label: 'Overview' },
    { icon: 'trending-up', href: '#services', label: 'How we advise' },
    { icon: 'life-buoy', href: '#request', label: 'Book a consultation' },
  ],
  meta: {
    title: 'Consultancy Services | Rekonstech Consulting and Trading Services',
    description:
      'IT consultancy and digital transformation advisory, compliance guidance, and staff training・Practical roadmaps your team can actually deliver, from an advisor with no product to push.',
  },

  hero: {
    eyebrow: 'Consultancy Services',
    titleLead: 'Advice first.',
    titleAccent: 'Technology second.',
    titleTail: '',
    copy: 'We sit on your side of the table, mapping where you are, what is worth changing and in what order. Sometimes the honest answer is that you do not need to buy anything.',
    primaryCta: { label: 'Book a Consultation', href: '#request' },
    secondaryCta: { label: 'How We Advise', href: '#services' },
    promises: [
      { icon: 'file-check', label: 'Findings you own in writing' },
      { icon: 'users', label: 'Your team trained, not sidelined' },
      { icon: 'shield-check', label: 'Vendor-neutral recommendations' },
    ],
    image: {
      // Our own photo, not a stock shot — swap only if the team wants a
      // different one. See public/img/consultancy-hero.jpg for the source crop.
      src: '/img/consultancy-hero.jpg',
      alt: 'A Rekonstech consultant reviewing a client system on a tablet with a colleague',
    },
  },

  /** Roadmap panel in the hero. */
  roadmap: {
    label: 'Engagement roadmap',
    phases: [
      { no: '01', title: 'Assess', body: 'Systems, spend and working practices mapped as they are', state: 'done' },
      { no: '02', title: 'Roadmap', body: 'Priorities sequenced against budget and risk', state: 'active' },
      { no: '03', title: 'Implement', body: 'Delivered by us, your team, or both together', state: 'next' },
      { no: '04', title: 'Review', body: 'Measured against the outcomes we agreed at the start', state: 'next' },
    ],
  },

  services: {
    eyebrow: 'How We Advise',
    title: 'CONSULTANCY',
    copy: 'Three advisory lines, all of them ending in something written down that you keep.',
    items: [
      {
        icon: 'trending-up',
        title: 'IT Consultancy & Digital Transformation',
        image: {
          src: 'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?auto=format&fit=crop&w=800&q=72',
          alt: 'Two colleagues reviewing findings on a clipboard',
        },
        summary: 'A roadmap from paper and patchwork tools to systems that scale with you.',
        features: [
          'Audit of what you run, what it costs and what it duplicates',
          'Prioritised roadmap with effort and budget against each item',
          'System selection with no vendor commission in play',
          'Business case you can take to a board',
        ],
        outcome: 'Typical engagement: 2 – 6 weeks',
      },
      {
        icon: 'shield-check',
        title: 'Compliance Guidance',
        image: {
          src: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?auto=format&fit=crop&w=800&q=72',
          alt: 'Team reviewing documentation around a meeting table',
        },
        summary: 'Practical help meeting data-handling and IT governance requirements in your sector.',
        features: [
          'Gap analysis against the rules that apply to you',
          'Data handling, retention and access policies drafted',
          'Backup, continuity and incident response plans',
          'Evidence pack ready for an auditor or regulator',
        ],
        outcome: 'Gap analysis in 1 – 2 weeks',
      },
      {
        icon: 'graduation-cap',
        title: 'Training & Capacity Building',
        image: {
          // Same photo as the hero — a real Rekonstech consultant walking a
          // colleague through a device, which is exactly what this card is about.
          src: '/img/consultancy-hero.jpg',
          alt: 'A Rekonstech consultant walking a colleague through a hands-on session on a tablet',
        },
        summary: 'Hands-on sessions so new systems get adopted rather than quietly abandoned.',
        features: [
          'Role-based sessions, not one generic slide deck',
          'Security awareness that changes actual behaviour',
          'Written guides and recordings your team keeps',
          'Admin handover so you are not dependent on us',
        ],
        outcome: 'Sessions from half a day',
      },
    ],
  },

  principles: {
    eyebrow: 'How We Work',
    title: 'We make money on advice,',
    titleAccent: 'not on what you buy.',
    copy: 'That distinction matters. It is why our recommendations sometimes cost us the follow-on sale.',
    items: [
      {
        icon: 'shield-check',
        title: 'Vendor-neutral',
        body: 'No commissions steering the recommendation. If your current system is fine, we say so.',
      },
      {
        icon: 'file-check',
        title: 'Written and yours',
        body: 'Findings, roadmap and policies handed over as documents you own and can act on without us.',
      },
      {
        icon: 'users',
        title: 'Skills transferred',
        body: 'We train your people as we go. A dependent client is not a successful engagement.',
      },
      {
        icon: 'target',
        title: 'Measured',
        body: 'Outcomes agreed at the start, reviewed at the end against what actually changed.',
      },
    ],
  },

  metrics: {
    items: [
      { value: '0', label: 'Vendor commissions taken' },
      { value: '100%', label: 'Engagements ending in written findings' },
      { value: '1 – 6', label: 'Weeks for most engagements' },
    ],
  },

  ctaBand: {
    title: 'Not sure what you actually need?',
    titleAccent: 'That is the right time to call.',
    copy: 'A first conversation costs nothing and often saves a great deal. Tell us what is not working and we will tell you honestly whether technology is the answer.',
  },
};
