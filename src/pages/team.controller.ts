import { Controller, Get, Query, Render } from '@nestjs/common';
import { serviceCategoryOptions, site } from '../content/site.content';
import { team } from '../content/team.content';

@Controller()
export class TeamController {
  @Get('team')
  @Render('team')
  teamPage(@Query('submitted') submitted?: string, @Query('error') error?: string) {
    return {
      site,
      page: team,
      serviceCategoryOptions,
      pageTitle: team.meta.title,
      metaDescription: team.meta.description,
      submitted: submitted === '1',
      formError: typeof error === 'string' ? error.slice(0, 160) : undefined,
    };
  }
}
