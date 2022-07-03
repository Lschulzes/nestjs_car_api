import { CreateReportOutput } from './dto/report-outputs';
import {
  CreateReportDTO,
  ApproveReportDTO,
  GetEstimateDTO,
} from './dto/report-inputs';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Auth } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Admin } from 'src/guards/admin.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(Auth)
  @Serialize(CreateReportOutput)
  createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(Admin)
  approveReport(@Param('id') id: string, @Body() { status }: ApproveReportDTO) {
    return this.reportsService.changeStatus(id, status);
  }

  @Get()
  getEstimate(@Query() query: GetEstimateDTO) {
    return this.reportsService.createEstimate(query);
  }
}
