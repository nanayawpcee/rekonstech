import { Injectable } from '@nestjs/common';
import {
  catalogueFilters,
  catalogueItems,
  catalogueMeta,
  type CatalogueItemView,
} from '../content/catalogue.content';

/**
 * The catalogue's data layer.
 *
 * Products currently come from a typed content file, which needs no database
 * and matches how the rest of the site is authored. This service is the single
 * seam: to let staff edit products, replace the bodies with repository calls
 * and neither the controller nor the views change.
 */
@Injectable()
export class CatalogueService {
  findAll(): CatalogueItemView[] {
    return catalogueItems;
  }

  filters() {
    return catalogueFilters;
  }

  meta() {
    return catalogueMeta;
  }
}
