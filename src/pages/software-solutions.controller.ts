import { Controller, Get, Query, Render } from '@nestjs/common';
import { serviceCategoryOptions, site } from '../content/site.content';
import { softwareBook } from '../content/software-book.content';
import { softwareSolutions } from '../content/software-solutions.content';
import { generateStars } from '../content/starfield';
import { techFilters, techStack } from '../content/tech-stack';

@Controller('services')
export class SoftwareSolutionsController {
  /**
   * Stars never change between requests, so build them once at boot. The sky
   * now spans four stacked sections rather than the hero alone, so it needs a
   * denser field to stay convincing over that height.
   */
  private readonly stars = generateStars(320);

  @Get('software-solutions')
  @Render('software-solutions')
  softwarePage(@Query('submitted') submitted?: string, @Query('error') error?: string) {
    return {
      site,
      page: softwareSolutions,
      book: softwareBook,
      techStack,
      techFilters,
      stars: this.stars,
      serviceCategoryOptions,
      // Pre-selects "Software Solutions" in the shared request form.
      presetCategory: 'software-solutions',
      pageTitle: softwareSolutions.meta.title,
      metaDescription: softwareSolutions.meta.description,
      pageScripts: ['/js/tech-stack.js', '/js/flip-book.js'],
      submitted: submitted === '1',
      formError: typeof error === 'string' ? error.slice(0, 160) : undefined,
    };
  }
}
