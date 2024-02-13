import { Optional } from '@nestjs/common';
import { IsBoolean, IsOptional } from 'class-validator';

export class CancelSubscriptionDto {
  @IsBoolean()
  @IsOptional()
  immediate?: boolean;
}
