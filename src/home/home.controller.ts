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
      pageTitle: `${site.company.legalName} | IT Solutions, Security Systems & Networking`,
      metaDescription: site.hero.copy,
      // Populated only for the no-JavaScript form round-trip.
      submitted: submitted === '1',
      formError: typeof error === 'string' ? error.slice(0, 160) : undefined,
    };
  }

  /** Container/uptime probe. */
  @Get('healthz')
  health() {
    return { status: 'ok', uptime: process.uptime() };
  }
}
