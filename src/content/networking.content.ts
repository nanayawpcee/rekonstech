/**
 * Copy for the Networking & Internet Services page (/services/networking).
 * Same principle as site.content.ts — edit here, never in the markup.
 */

export const networking = {

  /** Fixed section rail (xl and up). */
  rail: [
    { icon: 'network', href: '#top', label: 'Overview' },
    { icon: 'wifi', href: '#services', label: 'Network services' },
    { icon: 'life-buoy', href: '#request', label: 'Book a survey' },
  ],
  meta: {
    title: 'Networking & Internet Services | Rekonstech Consulting and Trading Services',
    description:
      'LAN, WAN and enterprise Wi-Fi designed from a site survey, internet setups for businesses, hotels, schools and hospitals, plus cloud integration and secure VPN access.',
  },

  hero: {
    eyebrow: 'Networking & Internet',
    titleLead: 'A network you',
    titleAccent: 'never think about',
    titleTail: 'because it just works',
    copy: 'We design the topology, run the cabling, configure the hardware and document the lot so that coverage reaches every room and the connection holds when the building is full.',
    primaryCta: { label: 'Book a Site Survey', href: '#request' },
    secondaryCta: { label: 'See What We Do', href: '#services' },
    promises: [
      { icon: 'wifi', label: 'Coverage surveyed, not guessed' },
      { icon: 'lock', label: 'Segmented and secured by default' },
      { icon: 'file-check', label: 'Documented and labelled at handover' },
    ],
    video: {
      src: '/video/networking-hero.mp4',
      poster: '/img/networking-hero-poster.jpg',
      alt: 'A glowing cable connects into an enterprise network switch in a server rack, with a translucent holographic data panel materialising above it',
    },
    galleryLabel: 'On site this month',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1785682117028-6fcf2c0b515b?auto=format&fit=crop&w=400&q=65',
        alt: 'Technician terminating cabling inside a comms cabinet',
      },
      {
        src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=65',
        alt: 'Numbered patch panel ports with cabling dressed to the rack',
      },
      {
        src: 'https://images.unsplash.com/photo-1663932210347-164a05ed0ccd?auto=format&fit=crop&w=400&q=65',
        alt: 'Coiled network cabling routed through a server cabinet',
      },
    ],
  },

  services: {
    eyebrow: 'What We Do',
    title: 'NETWORK SERVICES',
    copy: 'Three services that together take a site from bare walls to a documented, secured, working network.',
    items: [
      {
        icon: 'network',
        title: 'Network Design & Topology',
        image: {
          src: 'https://images.unsplash.com/photo-1698668975271-2ba9a323be6b?auto=format&fit=crop&w=800&q=72',
          alt: 'Structured cabling terminated neatly across a patch panel',
        },
        summary: 'LAN, WAN and enterprise Wi-Fi planned around how the building is actually used.',
        features: [
          'Wireless survey to find dead spots before we quote',
          'Switching and cable runs sized for growth, not just today',
          'VLANs that keep guests, staff and cameras apart',
          'Rack layout, labelling and as-built documentation',
        ],
        outcome: 'Survey to plan: 3 – 7 days',
      },
      {
        icon: 'globe',
        title: 'Internet Setup & Configuration',
        image: {
          src: 'https://images.unsplash.com/photo-1691435828932-911a7801adfb?auto=format&fit=crop&w=800&q=72',
          alt: 'Router and switch stack with status lights in a comms cabinet',
        },
        summary: 'Provisioned and tuned for the building・Offices, hotels, schools and hospitals.',
        features: [
          'ISP selection and failover so one outage is not a shutdown',
          'Guest portals with fair-use limits for hospitality',
          'Content filtering and safeguarding for schools',
          'Priority for the traffic that cannot stutter',
        ],
        outcome: 'Typical install: 1 – 5 days',
      },
      {
        icon: 'cloud',
        title: 'Cloud Integration & Secure VPN',
        image: {
          src: 'https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?auto=format&fit=crop&w=800&q=72',
          alt: 'Fibre optic patch leads fanning out inside a dark rack',
        },
        summary: 'Safe access to your systems from any site, any device, anywhere.',
        features: [
          'Site-to-site links between branches and head office',
          'Remote access VPN for staff working off-site',
          'Cloud storage and services wired into the local network',
          'Multi-factor authentication on every remote route in',
        ],
        outcome: 'Typical rollout: 2 – 10 days',
      },
    ],
  },

  environments: {
    eyebrow: 'Built For',
    title: 'Every building',
    titleAccent: 'behaves differently.',
    copy: 'A hotel and a hospital need opposite things from the same hardware. We configure for the building, not the brochure.',
    items: [
      {
        icon: 'briefcase',
        title: 'Businesses',
        body: 'Segmented office networks with room to add desks without recabling.',
      },
      {
        icon: 'users',
        title: 'Hotels & Hospitality',
        body: 'Guest Wi-Fi that holds up at full occupancy, with a portal and fair-use limits.',
      },
      {
        icon: 'graduation-cap',
        title: 'Schools',
        body: 'Filtered, safeguarded access across classrooms, labs and boarding houses.',
      },
      {
        icon: 'heart',
        title: 'Hospitals & Clinics',
        body: 'Priority for clinical systems, isolated guest access, and no single point of failure.',
      },
    ],
  },

  metrics: {
    title: 'What good looks like',
    items: [
      { value: '99.9%', label: 'Uptime target on managed links' },
      { value: '< 4 hrs', label: 'Response time on support contracts' },
      { value: '100%', label: 'Ports labelled and documented' },
    ],
  },

  process: {
    eyebrow: 'How We Work',
    title: 'Surveyed, cabled,',
    titleAccent: 'configured, documented.',
    copy: 'The order matters. Skipping the survey is why so many networks need ripping out two years later.',
    steps: [
      {
        title: 'Survey',
        body: 'We walk the building with a wireless survey tool and map coverage, interference and cable routes.',
      },
      {
        title: 'Design',
        body: 'Topology, VLANs, hardware and cable schedules written up as one itemised, quotable plan.',
      },
      {
        title: 'Install',
        body: 'Cabling run, terminated and tested to standard. Racks dressed, every port labelled.',
      },
      {
        title: 'Configure',
        body: 'Switches, firewall, Wi-Fi and VPN configured, hardened and tested under real load.',
      },
      {
        title: 'Support',
        body: 'Monitoring, firmware updates and a response time agreed in writing before you sign.',
      },
    ],
  },

  ctaBand: {
    title: 'Wi-Fi that drops in the far room?',
    titleAccent: 'That is a survey problem.',
    copy: 'Tell us where the network struggles. We will survey the site, show you the coverage map and quote the fix in writing.',
  },
};
