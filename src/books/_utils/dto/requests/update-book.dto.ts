import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from 'src/books/book.schema';
import { User } from 'src/users/user.schema';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly imageUrl?: string;

  @IsString()
  @IsOptional()
  readonly author?: string;

  @IsNumber()
  @IsOptional()
  readonly price?: number;

  @IsEnum(Category, { message: 'Please enter a correct category' })
  @IsOptional()
  readonly category?: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
