import { formErrorMessage } from '../service-requests/form-errors';
import { Controller, Get, Query, Render } from '@nestjs/common';
import { serviceCategoryOptions, site } from '../content/site.content';

@Controller()
export class HomeController {
  @Get()
  @Render('index')
  home(@Query('submitted') submitted?: string, @Query('error') error?: string) {
    return {
      site,
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
