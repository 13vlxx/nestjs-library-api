import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { CreateBookDto } from './_utils/dto/requests/create-book.dto';
import { UpdateBookDto } from './_utils/dto/requests/update-book.dto';
import { UserDocument } from 'src/users/user.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
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

    const books = await this.bookModel
      .find({ ...title })
      .limit(booksPerPage)
      .skip(skip)
      .populate('user');
    return books;
  }

  async create(createBookDto: CreateBookDto, user: UserDocument) {
    const data = Object.assign(createBookDto, { user: user._id });
    const book = await this.bookModel.create(data);
    return book;
  }

  async findById(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new NotFoundException('Book not found');
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async updateById(id: string, updateBookDto: UpdateBookDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new NotFoundException('Book not found');
    return await this.bookModel.findByIdAndUpdate(id, updateBookDto, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string, user: UserDocument) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new NotFoundException('Book not found');
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException('Book not found');
    if (book.user._id.equals(user._id))
      throw new UnauthorizedException('This is not your book');
    return await this.bookModel.findByIdAndDelete(id);
  }
}
