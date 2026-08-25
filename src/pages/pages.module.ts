import { Module } from '@nestjs/common';
import { NetworkingController } from './networking.controller';
import { SecuritySystemsController } from './security-systems.controller';
import { SoftwareSolutionsController } from './software-solutions.controller';

@Module({
  controllers: [SoftwareSolutionsController, SecuritySystemsController, NetworkingController],
})
export class PagesModule {}
