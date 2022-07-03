import { Exclude } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';
import { Report } from 'src/reports/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @MinLength(8)
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Array<Report>;

  @AfterInsert()
  logInsert() {
    console.log(`User inserted with the id of ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User with the id of ${this.id} has been updated`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`User with the id of ${this.id} has been deleted`);
  }
}
