import { CreateReportDTO } from './dto/report-inputs';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Auth } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(Auth)
  createReport(@Body() body: CreateReportDTO) {
    return this.reportsService.create(body);
  }
}
