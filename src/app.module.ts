import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { HomeModule } from './home/home.module';
import { PagesModule } from './pages/pages.module';
import { ServiceRequestsModule } from './service-requests/service-requests.module';

@Module({
  imports: [
    // Public form endpoint — cap submissions so the inbox cannot be flooded.
    ThrottlerModule.forRoot([{ name: 'default', ttl: 60_000, limit: 30 }]),
    HomeModule,
    PagesModule,
    ServiceRequestsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
