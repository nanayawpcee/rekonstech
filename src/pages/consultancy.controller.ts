import { Controller, Get, Query, Render } from '@nestjs/common';
import { consultancy } from '../content/consultancy.content';
import { serviceCategoryOptions, site } from '../content/site.content';

@Controller('services')
export class ConsultancyController {
  @Get('consultancy')
  @Render('consultancy')
  consultancyPage(@Query('submitted') submitted?: string, @Query('error') error?: string) {
    return {
      site,
      page: consultancy,
      serviceCategoryOptions,
      // Pre-selects "Consultancy Services" in the shared request form.
      presetCategory: 'consultancy',
      pageTitle: consultancy.meta.title,
      metaDescription: consultancy.meta.description,
      submitted: submitted === '1',
      formError: typeof error === 'string' ? error.slice(0, 160) : undefined,
    };
  }
}
