import { Types } from 'mongoose';
import { Category } from 'src/books/book.schema';
import { GetUserDto } from 'src/users/_utils/dto/responses/get-user.dto';

export class GetBookDto {
  id: string | Types.ObjectId;
  title: string;
  description: string;
  price: number;
  category: Category;
  user: GetUserDto;
}
