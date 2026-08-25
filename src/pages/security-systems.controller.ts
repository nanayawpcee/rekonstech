import { Controller, Get, Query, Render } from '@nestjs/common';
import { securitySystems } from '../content/security-systems.content';
import { serviceCategoryOptions, site } from '../content/site.content';

@Controller('services')
export class SecuritySystemsController {
  @Get('security-systems')
  @Render('security-systems')
  securityPage(@Query('submitted') submitted?: string, @Query('error') error?: string) {
    return {
      site,
      page: securitySystems,
      serviceCategoryOptions,
      // Pre-selects "Security Systems Installation" in the shared request form.
      presetCategory: 'security-systems',
      pageTitle: securitySystems.meta.title,
      metaDescription: securitySystems.meta.description,
      submitted: submitted === '1',
      formError: typeof error === 'string' ? error.slice(0, 160) : undefined,
    };
  }
}
