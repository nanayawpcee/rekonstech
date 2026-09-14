import { Module } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { ConsultancyController } from './consultancy.controller';
import { NetworkingController } from './networking.controller';
import { SalesSupplyController } from './sales-supply.controller';
import { SecuritySystemsController } from './security-systems.controller';
import { SoftwareSolutionsController } from './software-solutions.controller';
import { TeamController } from './team.controller';

@Module({
  controllers: [
    SoftwareSolutionsController,
    SecuritySystemsController,
    NetworkingController,
    SalesSupplyController,
    ConsultancyController,
    TeamController,
  ],
  providers: [CatalogueService],
})
export class PagesModule {}
