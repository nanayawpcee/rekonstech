/**
 * Copy for the Sales & Supply page (/services/sales-supply).
 * Same principle as site.content.ts — edit here, never in the markup.
 */

export const salesSupply = {
  meta: {
    title: 'Sales & Supply | Rekonstech Consulting and Trading Services',
    description:
      'Genuine desktops, laptops and servers, accessories and peripherals, and licensed software procurement — specced for the workload, configured before delivery and warranty-backed.',
  },

  hero: {
    eyebrow: 'Sales & Supply',
    // Three short lines, so the display type stays a block like the reference.
    titleLead: 'Genuine kit,',
    titleAccent: 'specced right,',
    titleTail: 'delivered ready',
    copy: 'We source hardware and licences from authorised channels, configure everything before it reaches your desk, and stand behind it with a warranty you can actually claim on.',
    primaryCta: { label: 'Request a Quotation', href: '#request' },
    secondaryCta: { label: 'What We Supply', href: '#services' },
    promises: [
      { icon: 'shield-check', label: 'Authorised channels only' },
      { icon: 'wrench', label: 'Configured before delivery' },
      { icon: 'file-check', label: 'Warranty and paperwork included' },
    ],
    /**
     * Studio shots on white, floated over the stage as one product cluster.
     * See `.product-float` — they are blended rather than cut out, so every
     * entry must stay white-background product photography.
     *
     * `layout` is presentational on purpose: keeping the placement here means
     * the whole composition can be re-arranged in one place instead of hunting
     * through the markup.
     */
    products: [
      {
        src: '/img/hero-headphones.jpg',
        alt: 'Customer wearing over-ear headphones',
        // Cropped at the frame edge, so it fades out at the bottom rather than
        // ending in a hard rectangle.
        layout: 'right-[1%] bottom-0 w-[46%] product-float--fade-b',
      },
      {
        src: '/img/hero-winlaptop.jpg',
        alt: 'Business laptop running Windows 11',
        layout: 'left-[0%] top-[14%] w-[50%]',
      },
      {
        src: '/img/hero-macbook.jpg',
        alt: 'Pro laptop, three-quarter view',
        layout: 'left-[26%] bottom-0 w-[34%] rotate-3',
      },
    ],
  },

  /** Slim anchor rail down the left of the hero (large screens only). */
  rail: [
    { icon: 'package', href: '#top', label: 'Top' },
    { icon: 'monitor', href: '#services', label: 'What we supply' },
    { icon: 'shield-check', href: '#assurances', label: 'Why buy through us' },
    { icon: 'life-buoy', href: '#request', label: 'Request a quote' },
  ],

  /** Illustrative quotation panel in the hero — deliberately shows no prices. */
  quote: {
    label: 'Sample quotation',
    reference: 'RQ-0248',
    rows: [
      { item: 'Business laptop', spec: 'i5 · 16GB · 512GB SSD', qty: '12' },
      { item: 'Tower server', spec: 'Xeon · 64GB · RAID 1', qty: '1' },
      { item: 'Managed switch', spec: '24-port gigabit PoE', qty: '2' },
      { item: 'Office suite licence', spec: 'Annual, per seat', qty: '12' },
    ],
    footnote: 'Specced to the workload. Priced on enquiry, itemised in writing.',
  },

  services: {
    eyebrow: 'What We Supply',
    title: 'SALES & SUPPLY',
    copy: 'Three supply lines, one accountable partner — so nobody is chasing three vendors when a machine arrives faulty.',
    items: [
      {
        icon: 'server',
        title: 'Hardware Supply',
        image: {
          src: 'https://images.unsplash.com/photo-1551978964-4ac29dc881ed?auto=format&fit=crop&w=800&q=72',
          alt: 'Boxed IT equipment stacked ready for despatch',
        },
        summary: 'Desktops, laptops and servers matched to the work they actually have to do.',
        features: [
          'Specced against your workload, not a sales target',
          'Imaged, joined and updated before delivery',
          'Asset tags and a serial register handed over',
          'Manufacturer warranty registered in your name',
        ],
        outcome: 'Typical lead time: 3 – 10 days',
      },
      {
        icon: 'keyboard',
        title: 'Accessories & Peripherals',
        image: {
          src: 'https://images.unsplash.com/photo-1538105891735-5ec7eadd8aa7?auto=format&fit=crop&w=800&q=72',
          alt: 'Shelves of computer components and peripherals in stock',
        },
        summary: 'Printers, UPS units, cabling, switches and the consumables that run out first.',
        features: [
          'Standardised kit lists so replacements are simple',
          'UPS units sized to the actual load, not guessed',
          'Cabling and connectors to the right specification',
          'Restocking schedules for consumables',
        ],
        outcome: 'Often same-week from stock',
      },
      {
        icon: 'file-check',
        title: 'Software Licensing & Procurement',
        image: {
          src: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&w=800&q=72',
          alt: 'Laptop and desk phone in a quiet office',
        },
        summary: 'Compliant licences, tracked renewals and procurement handled end to end.',
        features: [
          'Genuine licences with documentation you can audit',
          'Renewal calendar so nothing lapses quietly',
          'Right-sized seat counts — no shelfware',
          'Purchase records kept for your finance team',
        ],
        outcome: 'Licences issued within 48 hours',
      },
    ],
  },

  assurances: {
    eyebrow: 'Why Buy Through Us',
    title: 'The cheapest box',
    titleAccent: 'is rarely the cheapest.',
    copy: 'Grey imports save a little on the invoice and cost a lot on the day they fail. Everything we supply is traceable, warrantied and supportable.',
    items: [
      {
        icon: 'shield-check',
        title: 'Genuine and traceable',
        body: 'Authorised distributors only, with invoices and serials that stand up to audit.',
      },
      {
        icon: 'monitor',
        title: 'Configured, not just shipped',
        body: 'Imaged, updated, joined to your domain and tested before it leaves us.',
      },
      {
        icon: 'life-buoy',
        title: 'Supported after the sale',
        body: 'One number to call. We handle the warranty claim instead of you chasing a manufacturer.',
      },
      {
        icon: 'trending-up',
        title: 'Planned replacement',
        body: 'A refresh cycle agreed in advance, so failures stop being emergencies.',
      },
    ],
  },

  metrics: {
    items: [
      { value: '100%', label: 'Genuine, warranty-backed stock' },
      { value: '48 hrs', label: 'Typical quotation turnaround' },
      { value: '1', label: 'Point of contact for every claim' },
    ],
  },

  process: {
    eyebrow: 'How It Works',
    title: 'Specced, quoted,',
    titleAccent: 'configured, delivered.',
    copy: 'Four steps between a request and working equipment on a desk.',
    steps: [
      {
        title: 'Requirement',
        body: 'We ask what the machines are for and who uses them, rather than quoting from a catalogue page.',
      },
      {
        title: 'Quotation',
        body: 'An itemised quote with specifications, lead times and warranty terms in writing.',
      },
      {
        title: 'Configuration',
        body: 'Imaged, updated, licensed and asset-tagged in our workshop before delivery.',
      },
      {
        title: 'Delivery & handover',
        body: 'Installed at the desk, serials registered, and the old kit wiped or disposed of properly.',
      },
    ],
  },

  /** Dark closing panel: our own supply promise, not a fabricated review. */
  closing: {
    image: {
      src: '/img/team-hero.jpg',
      alt: 'Rekonstech engineers reviewing an equipment list on site',
    },
    statement:
      'We only supply what we would be willing to install ourselves — genuine, warrantied, and configured before it ever reaches your desk.',
    attribution: 'Rekonstech · Supply desk',
    cta: {
      title: 'Need to kit out a team?',
      body: 'Send us the headcount and what they do. You get an itemised quotation with specifications and lead times.',
      label: 'Request a Quotation',
      href: '#request',
    },
  },

  ctaBand: {
    title: 'Need to kit out a team?',
    titleAccent: 'Send us the headcount.',
    copy: 'Tell us how many people, what they do and your budget. You get an itemised quotation with specifications and lead times — no obligation.',
  },
};
