import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Category } from 'src/books/schemas/book.schema';
import { User } from 'src/users/schemas/user.schema';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsEnum(Category, { message: 'Please enter a correct category' })
  @IsNotEmpty()
  readonly category: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
