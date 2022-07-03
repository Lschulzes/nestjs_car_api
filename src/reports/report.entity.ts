import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum ReportStatus {
  REJECTED = 'REJECTED',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
}

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'simple-enum',
    enum: ReportStatus,
    default: ReportStatus.IN_REVIEW,
  })
  status: ReportStatus;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
