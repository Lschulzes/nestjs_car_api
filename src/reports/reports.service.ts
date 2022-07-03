import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO, GetEstimateDTO } from './dto/report-inputs';
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

  async createEstimate({
    make,
    model,
    lat,
    lng,
    year,
    mileage,
  }: GetEstimateDTO) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make')
      .andWhere('model = :model')
      .andWhere('lng - :lng BETWEEN -5 AND 5')
      .andWhere('lat - :lat BETWEEN -5 AND 5')
      .andWhere('year - :year BETWEEN -3 AND 3')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage, make, model, lat, lng, year })
      .limit(3)
      .getRawOne();
  }
}
