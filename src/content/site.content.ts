/**
 * Single source of truth for every piece of copy on the landing page.
 *
 * The controller passes this straight into the Handlebars view, so editing
 * marketing copy, phone numbers or the service catalogue never means touching
 * markup. Anything marked TODO is placeholder data for launch.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceCategory {
  /** Stable value used by the request form's category dropdown. */
  slug: string;
  icon: string;
  title: string;
  summary: string;
  items: ServiceItem[];
  /** Highlighted card gets the dark treatment in the grid. */
  featured?: boolean;
  /** Set when the service has its own page; the card links there instead of the form. */
  detailHref?: string;
}

export interface Stat {
  value: string;
  label: string;
  icon: string;
  /** Numeric portion for the count-up animation; omitted = no animation. */
  countTo?: number;
  suffix?: string;
}

export interface AboutTab {
  id: string;
  label: string;
  heading: string;
  body: string;
  bullets: string[];
}

export const site = {
  /**
   * Absolute origin, used to build the og:image URL — social scrapers reject
   * relative paths. TODO: set the real domain before launch.
   */
  siteUrl: "https://www.rekonstech.com",

  company: {
    name: "Rekonstech",
    legalName: "Rekonstech Consulting and Trading Services",
    tagline: "Consulting & Trading Services",
    // TODO: replace placeholder contact details before launch.
    phone: "+233 30 123 4567",
    phoneHref: "tel:+233301234567",
    emergencyPhone: "+233 55 987 6543",
    emergencyPhoneHref: "tel:+233559876543",
    email: "hello@rekonstech.com",
    supportHours: "24/7 Emergency IT Support",
    address: "Accra, Ghana",
    businessHours: "Mon – Sat, 8:00am – 6:00pm",
  },

  nav: <NavLink[]>[
    { label: "Home", href: "/#top" },
    { label: "About Us", href: "/#about" },
    { label: "Our Team", href: "/team" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/#contact" },
  ],

  hero: {
    eyebrow: "Your Trusted Technology Partner",
    titleLead: "Comprehensive IT Solutions &",
    titleAccent: "Technology Services",
    titleTail: "for Growing Enterprises",
    copy: "From custom software and secure networks to CCTV, biometric access and power backup. Rekonstech designs, installs and maintains the technology that keeps your business running.",
    primaryCta: { label: "Get a Free Quote", href: "/#request" },
    secondaryCta: { label: "Explore Services", href: "/#services" },
    image: {
      // Our own team photograph. Source is 632px square — replace with a wider,
      // higher-resolution original when one is available, since the hero band
      // scales it up considerably.
      src: "/img/team-hero.jpg",
      alt: "Three Rekonstech engineers in white coats and hard hats reviewing a job on a tablet",
    },
    socialProof: {
      value: "10K+",
      label: "Happy Clients",
      rating: "4.9/5 average service rating",
    },
    // TODO: swap for our real certifications, vendor partnerships and licences.
    badges: [
      { icon: "award", label: "Certified Engineers" },
      { icon: "shield-check", label: "Licensed & Insured" },
      { icon: "package", label: "Authorised Reseller" },
      { icon: "life-buoy", label: "SLA-Backed Support" },
    ],
  },

  requestBar: {
    title: "Quick IT Service Request",
    subtitle: "Book in 60 seconds.",
    note: "A consultant calls you back the same working day. No obligation.",
    submitLabel: "Submit Request",
  },

  about: {
    eyebrow: "Who We Are",
    title: "Technology Solutions",
    titleAccent: "for Every Enterprise",
    copy: "Rekonstech Consulting and Trading Services is a full-stack technology partner: we build the software, install the systems, supply the hardware and stay on call long after handover.",
    image: {
      src: "/img/subject1.png",
      alt: "Rekonstech technical team configuring client hardware",
    },
    insetImage: {
      src: "https://images.unsplash.com/photo-1591808216268-ce0b82787efe?auto=format&fit=crop&w=800&q=70",
      alt: "Structured network cabling terminated in a rack-mounted switch",
    },
    experienceBadge: { value: "15+", label: "Years Experience" },
    tabs: <AboutTab[]>[
      {
        id: "mission",
        label: "Our Mission",
        heading: "Technology that works the day after installation.",
        body: "We deliver reliable, secure and affordable technology tailored to how our clients actually operate then we maintain it, so the investment keeps paying off.",
        bullets: [
          "Single accountable partner, end to end",
          "Documented handover on every project",
          "Transparent pricing, no hidden extras",
          "Response times backed by written SLAs",
        ],
      },
      {
        id: "expertise",
        label: "Our Expertise",
        heading: "Software, security, networks and supply under one roof.",
        body: "Our engineers hold vendor credentials across networking, surveillance and cloud platforms, and have delivered for hotels, schools, hospitals and SMEs.",
        bullets: [
          "Custom web and business applications",
          "CCTV, alarm and biometric access systems",
          "LAN / WAN / Wi-Fi design and deployment",
          "Cloud integration and secure VPN access",
        ],
      },
      {
        id: "values",
        label: "Our Values",
        heading: "Do it properly, or do not sign it off.",
        body: "We work to standards our clients can audit clean installations, licensed software, genuine hardware and honest advice, even when it costs us the upsell.",
        bullets: [
          "Genuine hardware and licensed software only",
          "Security and compliance built in by default",
          "Skills transfer to your in-house team",
          "Long-term relationships over one-off jobs",
        ],
      },
    ],
  },

  stats: <Stat[]>[
    {
      value: "15+",
      countTo: 15,
      suffix: "+",
      label: "Years of Experience",
      icon: "award",
    },
    {
      value: "99%",
      countTo: 99,
      suffix: "%",
      label: "Client Satisfaction Rate",
      icon: "heart",
    },
    { value: "24/7", label: "Managed IT Support", icon: "life-buoy" },
    {
      value: "Enterprise",
      label: "Security & Cloud Integration",
      icon: "cloud",
    },
  ],

  services: {
    eyebrow: "Portfolio of Services",
    title: "Everything Your Business Needs",
    titleAccent: "Under One Roof",
    copy: "Five service lines, one accountable partner specify, install, integrate and support without juggling vendors.",
    categories: <ServiceCategory[]>[
      {
        slug: "software-solutions",
        icon: "code",
        title: "Software Solutions",
        summary:
          "Web platforms and business systems built around your workflow, not a template.",
        detailHref: "/services/software-solutions",
        items: [
          {
            icon: "monitor",
            title: "Custom Web Applications",
            description:
              "Portals, dashboards and internal tools built to your process.",
          },
          {
            icon: "globe",
            title: "SME Website Design & Development",
            description:
              "Fast, mobile-first sites that turn visitors into enquiries.",
          },
          {
            icon: "wrench",
            title: "Ongoing Maintenance & Support",
            description:
              "Updates, backups, monitoring and fixes on a fixed monthly plan.",
          },
        ],
      },
      {
        slug: "security-systems",
        icon: "shield-check",
        title: "Security Systems Installation",
        summary:
          "Surveillance, intrusion detection and access control, professionally installed.",
        detailHref: "/services/security-systems",
        featured: true,
        items: [
          {
            icon: "video",
            title: "CCTV Surveillance Systems",
            description: "HD coverage with remote monitoring from any device.",
          },
          {
            icon: "bell",
            title: "Intruder Alarm Systems",
            description:
              "Zoned detection with instant alerts and response protocols.",
          },
          {
            icon: "scan-face",
            title: "Biometric Identification",
            description:
              "Fingerprint and facial recognition for access and attendance.",
          },
          {
            icon: "zap",
            title: "Power Backup Systems",
            description:
              "UPS and solar integration that keeps critical systems live.",
          },
        ],
      },
      {
        slug: "networking-internet",
        icon: "network",
        title: "Networking & Internet Services",
        summary:
          "Networks engineered for uptime designed, cabled, configured and documented.",
        detailHref: "/services/networking",
        items: [
          {
            icon: "wifi",
            title: "Network Design & Topology",
            description:
              "LAN, WAN and enterprise Wi-Fi planned for real coverage.",
          },
          {
            icon: "globe",
            title: "Internet Setup & Configuration",
            description: "For businesses, hotels, schools and hospitals.",
          },
          {
            icon: "cloud",
            title: "Cloud Integration & Secure VPN",
            description: "Safe access to your systems from any site or device.",
          },
        ],
      },
      {
        slug: "sales-supply",
        icon: "package",
        title: "Sales & Supply",
        summary:
          "Genuine hardware and licensed software, sourced and configured before delivery.",
        detailHref: "/services/sales-supply",
        items: [
          {
            icon: "server",
            title: "Hardware Supply",
            description:
              "Desktops, laptops and servers specced to your workload.",
          },
          {
            icon: "keyboard",
            title: "Accessories & Peripherals",
            description:
              "Printers, UPS units, cabling, switches and consumables.",
          },
          {
            icon: "file-check",
            title: "Software Licensing & Procurement",
            description:
              "Compliant licences with renewal tracking handled for you.",
          },
        ],
      },
      {
        slug: "consultancy",
        icon: "lightbulb",
        title: "Consultancy Services",
        summary:
          "Advisory that turns technology spend into measurable business outcomes.",
        detailHref: "/services/consultancy",
        items: [
          {
            icon: "trending-up",
            title: "IT Consultancy & Digital Transformation",
            description:
              "Roadmaps, audits and system selection you can act on.",
          },
          {
            icon: "file-check",
            title: "Compliance Guidance",
            description:
              "Data protection and IT governance aligned to regulation.",
          },
          {
            icon: "graduation-cap",
            title: "Staff Training & Capacity Building",
            description:
              "Practical sessions that make your team self-sufficient.",
          },
        ],
      },
    ],
  },

  ctaBand: {
    eyebrow: "Ready When You Are",
    title: "Let us scope your project",
    titleAccent: "at no cost.",
    copy: "Tell us what you are trying to fix or build. We will assess the site, recommend an approach and quote it in writing usually within 48 hours.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=65",
    points: [
      "Free site survey and needs assessment",
      "Written, itemised quotation",
      "Nationwide installation teams",
    ],
  },

  footer: {
    blurb:
      "Rekonstech Consulting and Trading Services delivers software, security systems, networking, hardware supply and IT consultancy for growing enterprises.",
    columns: [
      {
        title: "Services",
        links: <NavLink[]>[
          { label: "Software Solutions", href: "/services/software-solutions" },
          { label: "Security Systems", href: "/#services" },
          { label: "Networking & Internet", href: "/#services" },
          { label: "Sales & Supply", href: "/#services" },
          { label: "Consultancy", href: "/#services" },
        ],
      },
      {
        title: "Company",
        links: <NavLink[]>[
          { label: "About Us", href: "/#about" },
          { label: "Our Portfolio", href: "/#portfolio" },
          { label: "Request a Quote", href: "/#request" },
          { label: "Support", href: "/#contact" },
        ],
      },
    ],
  },
};

/** Options for the quick-request form's category dropdown. */
export const serviceCategoryOptions = site.services.categories.map(
  (category) => ({
    value: category.slug,
    label: category.title,
  }),
);

export type SiteContent = typeof site;
