import { formErrorMessage } from '../service-requests/form-errors';
import { Controller, Get, Query, Render } from '@nestjs/common';
import { networking } from '../content/networking.content';
import { serviceCategoryOptions, site } from '../content/site.content';

@Controller('services')
export class NetworkingController {
  @Get('networking')
  @Render('networking')
  networkingPage(@Query('submitted') submitted?: string, @Query('error') error?: string) {
    return {
      site,
      page: networking,
      serviceCategoryOptions,
      // Pre-selects "Networking & Internet Services" in the shared request form.
      presetCategory: 'networking-internet',
      pageTitle: networking.meta.title,
      metaDescription: networking.meta.description,
      ogImage: networking.meta.ogImage,
      submitted: submitted === '1',
      formError: formErrorMessage(error),
    };
  }
}
