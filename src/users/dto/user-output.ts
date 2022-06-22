import { Expose } from 'class-transformer';

export class UserOutputDTO {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
