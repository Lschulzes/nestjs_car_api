import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ReportStatus } from '../report.entity';

export class CreateReportDTO {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(new Date().getFullYear())
  year: number;

  @IsNumber()
  @Min(0)
  @Max(150000)
  mileage: number;

  @IsNumber()
  lng: number;

  @IsNumber()
  lat: number;

  @IsNumber()
  @Min(100)
  @Max(500000)
  price: number;
}

export class ApproveReportDTO {
  @IsNotEmpty()
  @IsEnum(ReportStatus)
  status: ReportStatus;
}
