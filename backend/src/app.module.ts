import { Module } from '@nestjs/common';

import { DnsModule } from './dns/dns.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DnsModule],
  controllers: [],
})
export class AppModule {}
