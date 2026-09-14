export const softwareSolutions = {

  /** Fixed section rail (xl and up). */
  rail: [
    { icon: 'code', href: '#top', label: 'Overview' },
    { icon: 'file-check', href: '#portfolio-book', label: 'The portfolio' },
    { icon: 'server', href: '#stack', label: 'Our toolkit' },
    { icon: 'life-buoy', href: '#request', label: 'Start a project' },
  ],
  meta: {
    title: 'Software Solutions | rekonstech Consulting and Trading Services',
    description:
      'Custom web applications, SME website design and ongoing maintenance from rekonstech — scoped in plain language, built to modern standards, and supported long after launch.',
  },

  hero: {
    eyebrow: 'Software Solutions',
    titleLead: 'Design,',
    titleAccent: 'Build',
    titleTail: '& Maintain',
    copy: 'We build the web applications and business websites that growing enterprises actually run on — then we keep them fast, secure and current long after handover.',
    primaryCta: { label: 'Start a Project', href: '#request' },
    secondaryCta: { label: 'See Our Stack', href: '#stack' },
    promises: [
      { icon: 'file-check', label: 'Fixed-price, written quotes' },
      { icon: 'code', label: 'You own the source code' },
      { icon: 'life-buoy', label: 'SLA-backed support' },
    ],
  },

  // The three offerings are presented by the flip-book (software-book.content.ts).

  process: {
    eyebrow: 'How We Work',
    title: 'No surprises,',
    titleAccent: 'no mystery code.',
    copy: 'Five stages, each with something you can see and sign off. You always know what has been built and what comes next.',
    steps: [
      {
        title: 'Discover',
        body: 'A free consultation to understand the workflow, the constraints and the budget. You leave with a written scope.',
      },
      {
        title: 'Design',
        body: 'Wireframes and interface designs you can click through. Nothing gets built until you have approved how it looks and behaves.',
      },
      {
        title: 'Build',
        body: 'Short delivery cycles with a live staging link from week one, so progress is visible rather than promised.',
      },
      {
        title: 'Launch',
        body: 'Data migration, training for your team, and documentation handed over with the repository and credentials.',
      },
      {
        title: 'Support',
        body: 'Monitoring, backups, patches and enhancements under a maintenance plan sized to your system.',
      },
    ],
  },

  stack: {
    eyebrow: 'Our Toolkit',
    titleLead: 'What We',
    titleAccent: 'Build',
    titleTail: 'With',
    copy: 'We pick tools for how long they will serve you, not for how new they are. Hover any technology to see how we use it.',
    idleTitle: 'Our Technology Stack',
    idleCopy: 'Hover over a technology to see how we use it on client projects.',
  },

  ctaBand: {
    title: 'Have a system in mind?',
    titleAccent: 'Let us scope it — free.',
    copy: 'Describe the problem in plain language. We will tell you what it takes to build, what it costs to run, and whether software is even the right answer.',
  },
};
