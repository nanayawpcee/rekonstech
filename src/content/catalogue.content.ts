export const CATALOGUE_CATEGORIES = [
  "Laptops",
  "Desktops",
  "Servers & Networking",
  "Peripherals",
  "Software",
] as const;

export type CatalogueCategory = (typeof CATALOGUE_CATEGORIES)[number];

export interface CatalogueItem {
  sku: string;
  name: string;
  category: CatalogueCategory;
  spec: string;
  price: number;
  lead: string;
  image: { src: string; alt: string };
}

export interface CatalogueItemView extends CatalogueItem {
  priceLabel: string;
}

const CURRENCY = "GH₵";

const ITEMS: CatalogueItem[] = [
  {
    sku: "RK-LAP-BUS14",
    name: 'Business Laptop 14"',
    category: "Laptops",
    spec: "Core i5 · 16GB · 512GB SSD",
    price: 9800,
    lead: "3 – 5 days",
    image: {
      src: "https://images.unsplash.com/photo-1631543561902-b7dca288ac1b?auto=format&fit=crop&w=600&q=75",
      alt: "Business laptop viewed from above",
    },
  },
  {
    sku: "RK-LAP-PRO15",
    name: 'Pro Laptop 15"',
    category: "Laptops",
    spec: "Core i7 · 32GB · 1TB SSD",
    price: 16400,
    lead: "5 – 10 days",
    image: {
      src: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=75",
      alt: "Silver laptop on a light background",
    },
  },
  {
    sku: "RK-DSK-AIO24",
    name: 'All-in-One Desktop 24"',
    category: "Desktops",
    spec: "Core i5 · 16GB · 512GB SSD",
    price: 12500,
    lead: "3 – 7 days",
    image: {
      src: "https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&w=600&q=75",
      alt: "All-in-one desktop workstation",
    },
  },
  {
    sku: "RK-DSK-TWR",
    name: "Office Tower Desktop",
    category: "Desktops",
    spec: "Core i5 · 8GB · 256GB SSD",
    price: 6900,
    lead: "From stock",
    image: {
      src: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=600&q=75",
      alt: "Desktop tower internals",
    },
  },
  {
    sku: "RK-SRV-T1",
    name: "Tower Server",
    category: "Servers & Networking",
    spec: "Xeon · 64GB · RAID 1",
    price: 48000,
    lead: "10 – 15 days",
    image: {
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=75",
      alt: "Rack-mounted server hardware",
    },
  },
  {
    sku: "RK-NET-SW24",
    name: "Managed Switch 24-Port",
    category: "Servers & Networking",
    spec: "Gigabit · PoE+ · rack mount",
    price: 7400,
    lead: "5 – 8 days",
    image: {
      src: "https://images.unsplash.com/photo-1691435828932-911a7801adfb?auto=format&fit=crop&w=600&q=75",
      alt: "Network switch with status lights",
    },
  },
  {
    sku: "RK-PER-UPS15",
    name: "UPS 1.5kVA",
    category: "Peripherals",
    spec: "Line interactive · 4 outlets",
    price: 3200,
    lead: "From stock",
    image: {
      src: "https://images.unsplash.com/photo-1538105891735-5ec7eadd8aa7?auto=format&fit=crop&w=600&q=75",
      alt: "Shelved power and networking equipment",
    },
  },
  {
    sku: "RK-SFT-OFF",
    name: "Office Suite Licence",
    category: "Software",
    spec: "Annual · per seat · genuine",
    price: 950,
    lead: "48 hours",
    image: {
      src: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&w=600&q=75",
      alt: "Laptop and desk phone in an office",
    },
  },
];

function formatPrice(amount: number): string {
  return `${CURRENCY} ${amount.toLocaleString("en-GH")}`;
}

/** Catalogue rows with their display price already formatted. */
export const catalogueItems: CatalogueItemView[] = ITEMS.map((item) => ({
  ...item,
  priceLabel: formatPrice(item.price),
}));

/** Filter pills: "All" plus every category actually stocked. */
export const catalogueFilters = [
  { label: "All", value: "all" },
  ...CATALOGUE_CATEGORIES.filter((category) =>
    catalogueItems.some((item) => item.category === category),
  ).map((category) => ({ label: category, value: category.toLowerCase() })),
];

export const catalogueMeta = {
  currency: CURRENCY,
  eyebrow: "Catalogue",
  title: "Build your quote",
  titleAccent: "as you browse",
  copy: "Add what you need and send it over as one itemised enquiry. Nothing is charged here — we confirm stock, final pricing and lead times in writing.",
  priceNote: "Indicative prices, excluding VAT. Confirmed on quotation.",
  /**
   * The `price` field above is a placeholder — real figures are coming from
   * Sanity. Until that's wired up, this is the one switch that hides every
   * price and the basket's running total across the catalogue, the product
   * cards and the quote drawer, without touching any of that markup or logic.
   * Flip it to `true` once CatalogueService is reading real prices.
   */
  showPricing: false,
  noPriceNote: "Full specifications below. Pricing, stock and lead times are confirmed when we quote your request.",
};
