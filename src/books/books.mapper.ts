import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Book, BookDocument } from './book.schema';
import { UsersMapper } from 'src/users/users.mapper';
import { GetBookDto } from './_utils/dto/responses/get-book.dto';
import { Types } from 'mongoose';
@Injectable()
export class BooksMapper {
  constructor(private readonly usersMapper: UsersMapper) {}

  toGetBooksDto = (books: BookDocument[]): GetBookDto[] =>
    books.map((book) => {
      if (book.user instanceof Types.ObjectId)
        throw new InternalServerErrorException();
      return {
        id: book._id.toString(),
        title: book.title,
        description: book.description,
        price: book.price,
        category: book.category,
        user: this.usersMapper.toGetUserDto(book.user),
      };
    });
}
