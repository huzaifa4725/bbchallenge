import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { DnsService } from './dns.service';
import { RiskScoreDto } from './dns.dto';
@Controller('dns')
export class DnsController {
  constructor(private readonly dnsService: DnsService) {}

  @Post('riskscore')
  @HttpCode(200)
  async getRiskScore(@Body() riskScoreDto: RiskScoreDto) {
    const data = await this.dnsService.getDnsData(riskScoreDto.domainName);
    const riskScore = this.dnsService.calculateRisk(data);
    return { riskScore };
  }
}
