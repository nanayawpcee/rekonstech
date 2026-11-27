/**
 * Sales & Supply catalogue: types, labels and the fallback product list.
 *
 * Products are managed in Sanity (see studio-rekonstech_production/ and CatalogueService). Nothing
 * here carries a price: stock can include second-hand items, so every price
 * is agreed with the customer on quotation.
 */

/** Display order of the filter pills. Keep in step with studio-rekonstech_production/schemaTypes/product.ts. */
export const CATALOGUE_CATEGORIES = [
  "Laptops",
  "Desktops",
  "Servers & Networking",
  "Peripherals",
  "Software",
];

export type ProductCondition = "new" | "refurbished" | "used";

export const CONDITION_LABELS: Record<ProductCondition, string> = {
  new: "New",
  refurbished: "Refurbished",
  used: "Used",
};

export interface CatalogueItem {
  /** Stable key for the quote basket. */
  id: string;
  /** Stock code shown in quote requests; may be empty. */
  sku: string;
  name: string;
  category: string;
  spec: string;
  condition: ProductCondition;
  /** Optional detail for second-hand stock, e.g. "Grade A, new battery". */
  conditionNote?: string;
  /** Free text such as "From stock" or "3 to 5 days". */
  availability?: string;
  image: { src: string; alt: string };
}

export interface CatalogueItemView extends CatalogueItem {
  conditionLabel: string;
}

export interface CatalogueFilter {
  label: string;
  value: string;
}

/**
 * Shown only while Sanity is not configured (no SANITY_PROJECT_ID), so local
 * development and a fresh deploy still render a catalogue. Once Sanity is set
 * up, products come from the Studio instead and this list is ignored.
 */
export const fallbackCatalogue: CatalogueItem[] = [
  {
    id: "RK-LAP-BUS14",
    sku: "RK-LAP-BUS14",
    name: 'Business Laptop 14"',
    category: "Laptops",
    spec: "Core i5 · 16GB · 512GB SSD",
    condition: "new",
    availability: "3 – 5 days",
    image: {
      src: "https://images.unsplash.com/photo-1631543561902-b7dca288ac1b?auto=format&fit=crop&w=600&q=75",
      alt: "Business laptop viewed from above",
    },
  },
  {
    id: "RK-LAP-PRO15",
    sku: "RK-LAP-PRO15",
    name: 'Pro Laptop 15"',
    category: "Laptops",
    spec: "Core i7 · 32GB · 1TB SSD",
    condition: "new",
    availability: "5 – 10 days",
    image: {
      src: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=75",
      alt: "Silver laptop on a light background",
    },
  },
  {
    id: "RK-DSK-AIO24",
    sku: "RK-DSK-AIO24",
    name: 'All-in-One Desktop 24"',
    category: "Desktops",
    spec: "Core i5 · 16GB · 512GB SSD",
    condition: "new",
    availability: "3 – 7 days",
    image: {
      src: "https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&w=600&q=75",
      alt: "All-in-one desktop workstation",
    },
  },
  {
    id: "RK-DSK-TWR",
    sku: "RK-DSK-TWR",
    name: "Office Tower Desktop",
    category: "Desktops",
    spec: "Core i5 · 8GB · 256GB SSD",
    condition: "new",
    availability: "From stock",
    image: {
      src: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=600&q=75",
      alt: "Desktop tower internals",
    },
  },
  {
    id: "RK-SRV-T1",
    sku: "RK-SRV-T1",
    name: "Tower Server",
    category: "Servers & Networking",
    spec: "Xeon · 64GB · RAID 1",
    condition: "new",
    availability: "10 – 15 days",
    image: {
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=75",
      alt: "Rack-mounted server hardware",
    },
  },
  {
    id: "RK-NET-SW24",
    sku: "RK-NET-SW24",
    name: "Managed Switch 24-Port",
    category: "Servers & Networking",
    spec: "Gigabit · PoE+ · rack mount",
    condition: "new",
    availability: "5 – 8 days",
    image: {
      src: "https://images.unsplash.com/photo-1691435828932-911a7801adfb?auto=format&fit=crop&w=600&q=75",
      alt: "Network switch with status lights",
    },
  },
  {
    id: "RK-PER-UPS15",
    sku: "RK-PER-UPS15",
    name: "UPS 1.5kVA",
    category: "Peripherals",
    spec: "Line interactive · 4 outlets",
    condition: "new",
    availability: "From stock",
    image: {
      src: "https://images.unsplash.com/photo-1538105891735-5ec7eadd8aa7?auto=format&fit=crop&w=600&q=75",
      alt: "Shelved power and networking equipment",
    },
  },
  {
    id: "RK-SFT-OFF",
    sku: "RK-SFT-OFF",
    name: "Office Suite Licence",
    category: "Software",
    spec: "Annual · per seat · genuine",
    condition: "new",
    availability: "48 hours",
    image: {
      src: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&w=600&q=75",
      alt: "Laptop and desk phone in an office",
    },
  },
];

export function toView(item: CatalogueItem): CatalogueItemView {
  return { ...item, conditionLabel: CONDITION_LABELS[item.condition] ?? CONDITION_LABELS.new };
}

/** Filter pills: "All" plus every category actually listed, known ones first. */
export function buildFilters(items: CatalogueItem[]): CatalogueFilter[] {
  const present = Array.from(new Set(items.map((item) => item.category)));
  const ordered = [
    ...CATALOGUE_CATEGORIES.filter((category) => present.includes(category)),
    ...present.filter((category) => !CATALOGUE_CATEGORIES.includes(category)),
  ];
  return [
    { label: "All", value: "all" },
    ...ordered.map((category) => ({ label: category, value: category.toLowerCase() })),
  ];
}

export const catalogueMeta = {
  eyebrow: "Catalogue",
  title: "Build your quote",
  titleAccent: "as you browse",
  copy: "Add what you need and send it over as one itemised enquiry. Nothing is charged here. We confirm stock, condition, pricing and lead times with you directly.",
  note: "New, refurbished and used stock. Pricing is agreed with you on quotation.",
  emptyTitle: "Our stock list is being updated",
  emptyCopy: "Tell us what you need in the request form below and we will come back with what is available and a quotation.",
};
