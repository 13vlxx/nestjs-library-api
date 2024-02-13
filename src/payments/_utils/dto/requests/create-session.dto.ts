import { IsNumber, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  priceId: string;

  @IsNumber()
  numberOfLicence: number = 1;
}
