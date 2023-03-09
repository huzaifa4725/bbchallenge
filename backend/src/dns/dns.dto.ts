import { IsNotEmpty } from 'class-validator';
export class RiskScoreDto {
  @IsNotEmpty()
  domainName: string;
}
