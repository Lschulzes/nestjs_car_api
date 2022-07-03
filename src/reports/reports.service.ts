import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dto/report-inputs';
import { Report, ReportStatus } from './report.entity';
import { Serialize } from '../interceptors/serialize.interceptor';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDTO: CreateReportDTO, user: User) {
    const report = this.repo.create(reportDTO);

    report.user = user;

    return this.repo.save(report);
  }

  async changeStatus(id: string, status: ReportStatus) {
    const report = await this.repo.findOne({ where: { id: Number(id) } });
    if (!report) throw new NotFoundException('report not found!');

    report.status = status;

    return this.repo.save(report);
  }
}
