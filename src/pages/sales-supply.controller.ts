import { formErrorMessage } from '../service-requests/form-errors';
import { Controller, Get, Query, Render } from '@nestjs/common';
import { salesSupply } from '../content/sales-supply.content';
import { serviceCategoryOptions, site } from '../content/site.content';
import { CatalogueService } from './catalogue.service';

@Controller('services')
export class SalesSupplyController {
  constructor(private readonly catalogue: CatalogueService) {}

  @Get('sales-supply')
  @Render('sales-supply')
  async salesSupplyPage(@Query('submitted') submitted?: string, @Query('error') error?: string) {
    return {
      site,
      page: salesSupply,
      catalogue: await this.catalogue.load(),
      pageScripts: ['/js/quote-basket.js'],
      serviceCategoryOptions,
      // Pre-selects "Sales & Supply" in the shared request form.
      presetCategory: 'sales-supply',
      pageTitle: salesSupply.meta.title,
      metaDescription: salesSupply.meta.description,
      ogImage: salesSupply.meta.ogImage,
      submitted: submitted === '1',
      formError: formErrorMessage(error),
    };
  }
}
