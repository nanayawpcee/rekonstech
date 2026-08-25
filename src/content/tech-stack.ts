/**
 * The technology grid on the Software Solutions page.
 *
 * Brand marks come from `simple-icons` (single-path, 24x24) so every logo is
 * accurate and inline — no icon CDN, no hotlinked images. A handful of marks
 * were withdrawn from that package for trademark reasons; those render as a
 * wordmark tile instead, which the source design does for AWS and NGINX too.
 */
import * as simpleIcons from 'simple-icons';

export const TECH_CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'Cloud',
  'DevOps',
  'Collaboration',
] as const;

export type TechCategory = (typeof TECH_CATEGORIES)[number];

interface TechSource {
  /** simple-icons slug; omit when using `wordmark`. */
  slug?: string;
  /** Fallback for marks simple-icons no longer ships. */
  wordmark?: string;
  name: string;
  category: TechCategory;
  blurb: string;
  /** Overrides the brand hex when it is too dark to read on a dark tile. */
  color?: string;
}

const SOURCE: TechSource[] = [
  // ---------------------------------------------------------------- Frontend
  { slug: 'javascript', name: 'JavaScript', category: 'Frontend', blurb: 'The foundation of every interface we ship, written to modern ES standards.' },
  { slug: 'typescript', name: 'TypeScript', category: 'Frontend', blurb: 'Type-safe code that catches defects before they ever reach your users.' },
  { slug: 'react', name: 'React', category: 'Frontend', blurb: 'Component-driven interfaces for dashboards, portals and complex web apps.' },
  { slug: 'nextdotjs', name: 'Next.js', category: 'Frontend', blurb: 'Server-rendered React for sites that load fast and rank well on search.' },
  {slug: 'nestjs', name: 'NestJS', category: 'Frontend', blurb: 'Structured, testable APIs — the framework behind this very site.'},
  { slug: 'angular', name: 'Angular', category: 'Frontend', blurb: 'Structured, enterprise-grade front ends for large internal systems.' },
  { slug: 'redux', name: 'Redux', category: 'Frontend', blurb: 'Predictable state management for applications with complex workflows.' },
  { slug: 'tailwindcss', name: 'Tailwind CSS', category: 'Frontend', blurb: 'Design systems built straight into the markup — consistent and fast to iterate.' },
  { slug: 'sass', name: 'Sass', category: 'Frontend', blurb: 'Maintainable stylesheets for projects with bespoke visual identities.' },
  { slug: 'bootstrap', name: 'Bootstrap', category: 'Frontend', blurb: 'Rapid, dependable layouts when a project needs to ship yesterday.' },
  { slug: 'html5', name: 'HTML5', category: 'Frontend', blurb: 'Semantic, accessible markup that works on every device and screen reader.' },
  { slug: 'vite', name: 'Vite', category: 'Frontend', blurb: 'Near-instant builds and hot reloading that keep delivery moving.' },
  { slug: 'flutter', name: 'Flutter', category: 'Frontend', blurb: 'One codebase, native Android and iOS apps from a single delivery team.' },

  // ----------------------------------------------------------------- Backend
  { slug: 'nodedotjs', name: 'Node.js', category: 'Backend', blurb: 'Fast, event-driven services that scale with your transaction volume.' },
  { slug: 'nestjs', name: 'NestJS', category: 'Backend', blurb: 'Structured, testable APIs — the framework behind this very site.' },
  { slug: 'express', name: 'Express', category: 'Backend', blurb: 'Lightweight HTTP services and integrations, deployed in days not weeks.' },
  { slug: 'php', name: 'PHP', category: 'Backend', blurb: 'Pragmatic server-side development on the stack most hosts already run.' },
  { slug: 'laravel', name: 'Laravel', category: 'Backend', blurb: 'Batteries-included business applications with clean, auditable code.' },
  { slug: 'python', name: 'Python', category: 'Backend', blurb: 'Automation, data processing and integrations between systems that never spoke.' },
  { slug: 'django', name: 'Django', category: 'Backend', blurb: 'Secure, admin-ready platforms for organisations handling sensitive records.' },
  { slug: 'graphql', name: 'GraphQL', category: 'Backend', blurb: 'Precise data contracts so mobile and web clients fetch exactly what they need.' },
  { slug: 'socketdotio', name: 'Socket.IO', category: 'Backend', blurb: 'Live dashboards, chat and real-time alerts pushed the moment things change.' },
  

  // ---------------------------------------------------------------- Database
  { slug: 'postgresql', name: 'PostgreSQL', category: 'Database', blurb: 'The default for systems where data integrity is non-negotiable.' },
  { slug: 'mysql', name: 'MySQL', category: 'Database', blurb: 'Proven relational storage for business applications and reporting.' },
  { slug: 'mongodb', name: 'MongoDB', category: 'Database', blurb: 'Flexible document storage for records that refuse to sit in tables.' },
  { slug: 'redis', name: 'Redis', category: 'Database', blurb: 'In-memory caching and queues that take load off your primary database.' },
  { slug: 'sqlite', name: 'SQLite', category: 'Database', blurb: 'Zero-admin local storage for field tools and offline-capable apps.' },
  { slug: 'prisma', name: 'Prisma', category: 'Database', blurb: 'Type-safe database access with migrations that survive team handovers.' },
  { slug: 'supabase', name: 'Supabase', category: 'Database', blurb: 'Managed Postgres with auth and storage for a faster route to launch.' },
  { slug: 'firebase', name: 'Firebase', category: 'Database', blurb: 'Realtime sync and authentication for mobile-first products.' },

  // ------------------------------------------------------------------- Cloud
  { wordmark: 'aws', name: 'Amazon Web Services', category: 'Cloud', blurb: 'Enterprise hosting, storage and backup on infrastructure that scales on demand.', color: '#FF9900' },
  { slug: 'digitalocean', name: 'DigitalOcean', category: 'Cloud', blurb: 'Cost-effective cloud servers sized honestly for SME workloads.' },
  { slug: 'vercel', name: 'Vercel', category: 'Cloud', blurb: 'Edge-deployed front ends that stay fast for visitors anywhere.', color: '#FFFFFF' },
  { slug: 'netlify', name: 'Netlify', category: 'Cloud', blurb: 'Continuous deployment for marketing sites with preview builds on every change.' },
  { slug: 'cloudflare', name: 'Cloudflare', category: 'Cloud', blurb: 'CDN, DNS and DDoS protection sitting in front of everything we host.' },

  // ------------------------------------------------------------------ DevOps
  { slug: 'docker', name: 'Docker', category: 'DevOps', blurb: 'Identical environments from a developer laptop through to production.' },
  { slug: 'kubernetes', name: 'Kubernetes', category: 'DevOps', blurb: 'Orchestrated, self-healing deployments for systems that cannot go down.' },
  { slug: 'nginx', name: 'NGINX', category: 'DevOps', blurb: 'Hardened reverse proxying, TLS termination and load balancing.' },
  { slug: 'githubactions', name: 'GitHub Actions', category: 'DevOps', blurb: 'Automated tests and deployments triggered on every merge.' },
  { slug: 'linux', name: 'Linux', category: 'DevOps', blurb: 'The servers we provision, harden and maintain for our clients.' },
  { slug: 'ubuntu', name: 'Ubuntu', category: 'DevOps', blurb: 'Our standard server distribution — long-term support, predictable patching.' },
  { slug: 'git', name: 'Git', category: 'DevOps', blurb: 'Every change tracked, reviewed and reversible. No mystery code.' },

  // ----------------------------------------------------------- Collaboration
  { slug: 'github', name: 'GitHub', category: 'Collaboration', blurb: 'Your code, in your organisation — you own the repository from day one.', color: '#FFFFFF' },
  { slug: 'gitlab', name: 'GitLab', category: 'Collaboration', blurb: 'Self-hosted source control for clients with data-residency requirements.' },
  { slug: 'figma', name: 'Figma', category: 'Collaboration', blurb: 'Interface design you can click through and approve before a line is built.' },
  { slug: 'notion', name: 'Notion', category: 'Collaboration', blurb: 'Living documentation and handover notes your team keeps after we leave.', color: '#FFFFFF' },
  { wordmark: 'slack', name: 'Slack', category: 'Collaboration', blurb: 'A shared channel with your project team, not a ticket queue and a shrug.', color: '#E01E5A' },
  { slug: 'discord', name: 'Discord', category: 'Collaboration', blurb: 'Direct access to engineers for clients who prefer it to email threads.' },
  { slug: 'postman', name: 'Postman', category: 'Collaboration', blurb: 'Documented, testable APIs handed over with working example requests.' },
];

export interface TechItem {
  id: string;
  name: string;
  category: TechCategory;
  blurb: string;
  /** SVG path data, or null when the tile renders a wordmark. */
  path: string | null;
  wordmark?: string;
  /** Display colour on the dark mosaic tiles, lightened where needed. */
  color: string;
  /** True brand colour. Fills the spotlight's icon slot. */
  brandHex: string;
  /** Readable ink for a mark sitting on `brandHex`. */
  onBrand: string;
}

/** Perceived luminance (0–1) of a #RRGGBB string. */
function luminance(hex: string): number {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function iconFor(slug: string): { path: string; hex: string } | null {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const icon = (simpleIcons as unknown as Record<string, { path: string; hex: string }>)[key];
  return icon ? { path: icon.path, hex: icon.hex } : null;
}

export const techStack: TechItem[] = SOURCE.map((entry) => {
  const icon = entry.slug ? iconFor(entry.slug) : null;
  // The true brand colour — this is what fills the spotlight's icon slot.
  const brandHex = entry.color ?? (icon ? `#${icon.hex}` : '#0B1424');
  // Marks like Next.js, Vercel and GitHub are pure black — unusable *on* a dark
  // mosaic tile, so the tiles use a lightened version instead.
  const color = luminance(brandHex) < 0.16 ? '#FFFFFF' : brandHex;

  return {
    id: (entry.slug ?? entry.wordmark ?? entry.name).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: entry.name,
    category: entry.category,
    blurb: entry.blurb,
    path: icon ? icon.path : null,
    wordmark: entry.wordmark,
    color,
    brandHex,
    // Light brand colours (JavaScript yellow, React cyan) need dark ink on top.
    onBrand: luminance(brandHex) > 0.55 ? '#0B1424' : '#FFFFFF',
  };
});

/** Pills for the grid filter: "All" plus every category actually in use. */
export const techFilters = [
  { label: 'All', value: 'all' },
  ...TECH_CATEGORIES.filter((category) => techStack.some((tech) => tech.category === category)).map(
    (category) => ({ label: category, value: category.toLowerCase() }),
  ),
];
