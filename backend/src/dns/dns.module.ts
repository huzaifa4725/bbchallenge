import { Module } from '@nestjs/common';
import { DnsController } from './dns.controller';
import { DnsService } from './dns.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [DnsController],
  imports: [HttpModule],
  providers: [DnsService],
})
export class DnsModule {}
