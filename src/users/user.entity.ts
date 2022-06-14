import { IsEmail, MinLength } from 'class-validator';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
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
