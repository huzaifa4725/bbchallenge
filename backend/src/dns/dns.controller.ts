import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DnsService } from './dns.service';
import { RiskScoreDto } from './dns.dto';
@Controller('dns')
export class DnsController {
  constructor(private readonly dnsService: DnsService) {}

  @Post('riskscore')
  async getRiskScore(@Body() riskScoreDto: RiskScoreDto) {
    try {
      const data = await this.dnsService.getDnsData(riskScoreDto.domainName);
      const riskScore = this.dnsService.calculateRisk(data);
      return { riskScore };
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
