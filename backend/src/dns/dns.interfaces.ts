export interface DnsRecord {
  record_type: string;
  value?: string;
  [key: string]: string | undefined | number;
}
