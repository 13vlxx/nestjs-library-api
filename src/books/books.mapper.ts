import { Injectable } from '@nestjs/common';
import { Book, BookDocument } from './book.schema';
import { UsersMapper } from 'src/users/users.mapper';
import { GetBooksDto } from './_utils/dto/responses/get-books.dto';
@Injectable()
export class BooksMapper {
  constructor(private readonly usersMapper: UsersMapper) {}

  toGetBooksDto = async (books: BookDocument[]): Promise<GetBooksDto[]> => {
    return await Promise.all(
      books.map(async (book) => {
        const userDto = await this.usersMapper.toFindAndGetUserDto(
          book.user._id,
        );
        return {
          id: book._id.toString(),
          title: book.title,
          description: book.description,
          price: book.price,
          category: book.category,
          user: userDto,
        };
      }),
    );
  };
}
