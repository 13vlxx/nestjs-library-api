import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Book, BookDocument } from './book.schema';
import { UsersMapper } from 'src/users/users.mapper';
import { GetBookDto } from './_utils/dto/responses/get-book.dto';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';
@Injectable()
export class BooksMapper {
  constructor(private readonly usersMapper: UsersMapper) {}

  toGetBookDto = (book: BookDocument): GetBookDto => {
    if (book.user instanceof Types.ObjectId)
      throw new InternalServerErrorException();
    return {
      id: book._id.toString(),
      title: book.title,
      description: book.description,
      imageUrl: book.imageUrl,
      price: book.price,
      category: book.category,
      user: this.usersMapper.toGetUserDto(book.user),
    };
  };

  toGetBooksDto = (books: BookDocument[]): GetBookDto[] =>
    books.map((book) => {
      return this.toGetBookDto(book);
    });
}
