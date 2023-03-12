import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DnsRecord } from './dns.interfaces';
import axios from 'axios';

@Injectable()
export class DnsService {
  constructor(private readonly configService: ConfigService) {}

  calculateRisk(records: DnsRecord[]) {
    let domainRisk = 3; // start with high risk
    if (records.length === 0) return -1;
    const filterMxRecords = records.filter(
      (x) => x.record_type.toLowerCase() === 'mx',
    );
    if (filterMxRecords.length > 0) {
      const mxRecord = filterMxRecords[0].value.toLowerCase();
      if (mxRecord.includes('google.com') || mxRecord.includes('outlook.com')) {
        domainRisk -= 1;
      }
    }

    const spf1Record = records.find(
      (r) =>
        r.record_type.toLowerCase() === 'txt' &&
        r.value.toLowerCase().startsWith('v=spf1'),
    );
    if (spf1Record) domainRisk -= 1;

    const dmarcRecord = records.find(
      (r) =>
        r.record_type.toLowerCase() === 'txt' &&
        r.value.toLowerCase().startsWith('v=dmarc1'),
    );
    if (dmarcRecord) domainRisk -= 1;

    return domainRisk;
  }

  async getDnsData(domain: string): Promise<DnsRecord[]> {
    try {
      const apiKey = this.configService.get<string>('DNS_API_KEY');
      const url = this.configService.get<string>('DNS_API_URL');
      const response = await axios.get(`${url}?domain=${domain}`, {
        headers: { 'X-API-KEY': apiKey },
      });
      return response.data;
    } catch (e) {
      throw new HttpException(e.response.data, e.response.status);
    }
  }
}
