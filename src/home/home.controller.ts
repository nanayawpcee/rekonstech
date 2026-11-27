import { formErrorMessage } from '../service-requests/form-errors';
import { Controller, Get, Query, Render } from '@nestjs/common';
import { serviceCategoryOptions, site } from '../content/site.content';
import { CatalogueService } from '../pages/catalogue.service';

/** How many products the home page stock strip shows. */
const STOCK_STRIP_SIZE = 4;

@Controller()
export class HomeController {
  constructor(private readonly catalogue: CatalogueService) {}

  @Get()
  @Render('index')
  async home(@Query('submitted') submitted?: string, @Query('error') error?: string) {
    return {
      site,
      stock: await this.catalogue.featured(STOCK_STRIP_SIZE),
      serviceCategoryOptions,
      isHome: true,
      pageTitle: site.meta.title,
      metaDescription: site.meta.description,
      ogImage: site.meta.ogImage,
      // Populated only for the no-JavaScript form round-trip.
      submitted: submitted === '1',
      formError: formErrorMessage(error),
    };
  }

  /** Container/uptime probe. */
  @Get('healthz')
  health() {
    return { status: 'ok' };
  }
}
