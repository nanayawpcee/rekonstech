import { Injectable, Logger } from '@nestjs/common';
import {
  buildFilters,
  catalogueMeta,
  fallbackCatalogue,
  toView,
  type CatalogueFilter,
  type CatalogueItem,
  type CatalogueItemView,
  type ProductCondition,
} from '../content/catalogue.content';

export interface CatalogueData {
  items: CatalogueItemView[];
  filters: CatalogueFilter[];
  meta: typeof catalogueMeta;
}

/** Shape returned by the GROQ query below. */
interface SanityProduct {
  _id: string;
  sku?: string;
  name?: string;
  category?: string;
  spec?: string;
  condition?: ProductCondition;
  conditionNote?: string;
  availability?: string;
  imageUrl?: string;
  imageAlt?: string;
}

const API_VERSION = 'v2025-02-19';
const CACHE_MS = 60_000;
const TIMEOUT_MS = 4_000;

/** Published, visible products in the order staff set in the Studio. */
const PRODUCTS_QUERY = `*[_type == "product" && !(_id in path("drafts.**")) && hidden != true]
  | order(coalesce(sortOrder, 1000) asc, _createdAt desc) {
    _id, sku, name, category, spec, condition, conditionNote, availability,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }`;

/**
 * The catalogue's data layer.
 *
 * With SANITY_PROJECT_ID set, products are read from Sanity over its HTTP API
 * (no SDK, so nothing ESM-only lands in the CommonJS build) and cached for a
 * minute per server instance. Without it, the typed fallback list is used so
 * local development needs no account. If Sanity is unreachable, the last good
 * result is served rather than an empty page.
 */
@Injectable()
export class CatalogueService {
  private readonly logger = new Logger(CatalogueService.name);
  private readonly projectId = process.env.SANITY_PROJECT_ID?.trim();
  private readonly dataset = process.env.SANITY_DATASET?.trim() || 'production';
  private readonly token = process.env.SANITY_READ_TOKEN?.trim();

  private cache: { items: CatalogueItem[]; at: number } | null = null;

  async load(): Promise<CatalogueData> {
    const items = await this.products();
    return { items: items.map(toView), filters: buildFilters(items), meta: catalogueMeta };
  }

  private async products(): Promise<CatalogueItem[]> {
    if (!this.projectId) return fallbackCatalogue;
    if (this.cache && Date.now() - this.cache.at < CACHE_MS) return this.cache.items;

    try {
      const items = await this.fetchFromSanity();
      this.cache = { items, at: Date.now() };
      return items;
    } catch (error) {
      this.logger.warn(`Sanity catalogue fetch failed: ${(error as Error).message}`);
      return this.cache?.items ?? [];
    }
  }

  private async fetchFromSanity(): Promise<CatalogueItem[]> {
    // The CDN host serves public datasets fast; a token needs the live API.
    const host = this.token ? 'api.sanity.io' : 'apicdn.sanity.io';
    const url =
      `https://${this.projectId}.${host}/${API_VERSION}/data/query/${this.dataset}` +
      `?query=${encodeURIComponent(PRODUCTS_QUERY)}&perspective=published`;

    const response = await fetch(url, {
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : undefined,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) throw new Error(`Sanity responded ${response.status}`);

    const body = (await response.json()) as { result?: SanityProduct[] };
    return (body.result ?? []).filter((doc) => doc.name && doc.category).map(toItem);
  }
}

function toItem(doc: SanityProduct): CatalogueItem {
  return {
    id: doc._id,
    sku: doc.sku?.trim() ?? '',
    name: doc.name!.trim(),
    category: doc.category!,
    spec: doc.spec?.trim() ?? '',
    condition: doc.condition ?? 'new',
    conditionNote: doc.conditionNote?.trim() || undefined,
    availability: doc.availability?.trim() || undefined,
    image: {
      // Sanity's image CDN resizes on the fly; 2x the card size for sharp screens.
      src: doc.imageUrl ? `${doc.imageUrl}?w=640&h=384&fit=crop&auto=format&q=75` : '/img/product-placeholder.svg',
      alt: doc.imageAlt?.trim() || doc.name!.trim(),
    },
  };
}
