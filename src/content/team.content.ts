

export const team = {
  /** Fixed section rail (xl and up). */
  rail: [
    { icon: 'users', href: '#top', label: 'Overview' },
    { icon: 'briefcase', href: '#members', label: 'Meet the team' },
    { icon: 'life-buoy', href: '#request', label: 'Talk to us' },
  ],

  meta: {
    title: 'Our Team | Rekonstech Consulting and Trading Services',
    description:
      'The four specialists behind Rekonstech — software, security, networking and supply, led by people who stay on the account after handover.',
  },

  hero: {
    eyebrow: 'Our Team',
    titleLead: 'Small team.',
    titleAccent: 'Full accountability.',
    titleTail: '',
    copy: 'Every engagement is led by one of four people you can actually reach — not a rotating helpdesk queue. That is deliberate: it is how work stays accountable after the invoice is paid.',
    primaryCta: { label: 'Talk to a Specialist', href: '#request' },
    secondaryCta: { label: 'Meet the Team', href: '#members' },
    image: {
      src: '/img/team-hero.jpg',
      alt: 'Three Rekonstech engineers in white coats and hard hats reviewing a job on a tablet',
    },
    promises: [
      { icon: 'code', label: 'Software Engineering' },
      { icon: 'shield-check', label: 'Security & Networking' },
      { icon: 'wrench', label: 'Sales & Supply' },
      { icon: 'graduation-cap', label: 'Consultancy & Training' },
    ],
    highlights: [
      { value: '4', label: 'Named specialists, not a call queue' },
      { value: '15+', label: 'Years of combined experience' },
      { value: '5', label: 'Service lines covered between us' },
    ],
  },

  members: {
    eyebrow: 'Meet the Team',
    title: 'THE PEOPLE',
    titleAccent: 'BEHIND THE WORK',
    copy: 'Four specialists, one shared number. Whoever you speak to can pull in the others the same day.',
    
    items: [
      {
        icon: 'target',
        name: 'Princer Kwame Acheampong',
        role: 'CEO & Managing Director',
        bio: 'Sets the roadmap for every engagement and stays the one point of contact from proposal to handover.',
        image: {
          src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=480&q=75',
          alt: 'Portrait of Princer Kwame Acheampong, CEO & Managing Director at Rekonstech',
        },
      },
      {
        icon: 'code',
        name: 'Prince Charles Appiah Gyamrah',
        role: 'Software Engineer',
        bio: 'Leads custom builds end to end — from data migration to the training session that hands the system over.',
        image: {
          src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=480&q=75',
          alt: 'Portrait of Prince Charles Appiah Gyamrah, Software Engineer at Rekonstech',
        },
      },
      {
        icon: 'shield-check',
        name: 'Alexander Segbedzi',
        role: 'Head of Security & Networking',
        bio: 'Designs the CCTV, access-control and network installs, then keeps them covered under a written SLA.',
        image: {
          src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=480&q=75',
          alt: 'Portrait of Alexander Segbedzi, Head of Security & Networking at Rekonstech',
        },
      },
      {
        icon: 'design',
        name: 'David Akariboga',
        role: 'Graphic Designer & Supply Specialist',
        bio: 'Sources and configures every device before it ships, and runs the consultancy workshops that follow.',
        image: {
          src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=480&q=75',
          alt: 'Portrait of David Akariboga, Graphic Designer & Supply Specialist at Rekonstech',
        },
      },
    ],
  },

  principles: {
    eyebrow: 'How We Work',
    title: 'One team,',
    titleAccent: 'four people you can actually reach.',
    copy: 'Every engagement has a named lead, but nobody works in isolation — the whole team is briefed and can step in.',
    items: [
      {
        icon: 'users',
        title: 'One point of contact',
        body: 'A named lead owns your account from first call to handover, not a rotating helpdesk queue.',
      },
      {
        icon: 'shield-check',
        title: 'Cross-trained coverage',
        body: 'Every specialist can speak to the others’ work, so a single absence never stalls a job.',
      },
      {
        icon: 'file-check',
        title: 'Documented handover',
        body: 'What we install and why is written down, so the knowledge stays with you, not just with us.',
      },
      {
        icon: 'life-buoy',
        title: 'Direct line, no ticket queue',
        body: 'You get a mobile number for your lead, not a support inbox that resets each time you write in.',
      },
    ],
  },

  ctaBand: {
    title: 'Want to work with one of us directly?',
    titleAccent: 'Tell us what needs doing.',
    copy: 'Every request is routed to the specialist who owns that area — no call centre in between.',
  },
};
