import { Module } from '@nestjs/common';
import { PagesModule } from '../pages/pages.module';
import { HomeController } from './home.controller';

@Module({ imports: [PagesModule], controllers: [HomeController] })
export class HomeModule {}
