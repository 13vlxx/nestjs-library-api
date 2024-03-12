import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Query } from 'express-serve-static-core';
import mongoose from 'mongoose';
import { UserDocument } from 'src/users/user.schema';
import { CreateBookDto } from './_utils/dto/requests/create-book.dto';
import { UpdateBookDto } from './_utils/dto/requests/update-book.dto';
import { BookDocument } from './book.schema';
import { BooksMapper } from './books.mapper';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly booksMapper: BooksMapper,
  ) {}

  async findAll(query: Query) {
    const booksPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = booksPerPage * (currentPage - 1);
    const title = query.title
      ? {
          title: {
            $regex: query.title,
            $options: 'i',
          },
        }
      : {};

    const books: BookDocument[] = await this.booksRepository.findAll(
      title,
      booksPerPage,
      skip,
    );
    return this.booksMapper.toGetBooksDto(books);
  }

  async create(createBookDto: CreateBookDto, user: UserDocument) {
    return this.booksRepository.create(createBookDto, user._id);
  }

  async findById(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new NotFoundException('Book not found');
    const book = await this.booksRepository.findById(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async updateById(id: string, updateBookDto: UpdateBookDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new NotFoundException('Book not found');
    return await this.booksRepository.findByIdAndUpdate(id, updateBookDto);
  }

  async deleteById(id: string, user: UserDocument) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new NotFoundException('Book not found');
    const book = await this.booksRepository.findById(id);
    if (!book) throw new NotFoundException('Book not found');
    if (!book.user._id.equals(user._id))
      throw new UnauthorizedException('This is not your book');
    return await this.booksRepository.findByIdAndDelete(id);
  }
}
