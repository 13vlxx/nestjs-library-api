import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.schema';
import { Model, Types } from 'mongoose';
import { CreateBookDto } from './_utils/dto/requests/create-book.dto';
import { UpdateBookDto } from './_utils/dto/requests/update-book.dto';

@Injectable()
export class BooksRepository {
  constructor(@InjectModel(Book.name) private readonly model: Model<Book>) {}

  findById = (id: string | Types.ObjectId) => this.model.findById(id).exec();

  findAll = (title: Object, limit: number, skip: number) =>
    this.model
      .find({ ...title })
      .limit(limit)
      .skip(skip)
      .populate('user')
      .exec();

  findByIdAndUpdate = (
    id: string | Types.ObjectId,
    updateBookDto: UpdateBookDto,
  ) =>
    this.model
      .findByIdAndUpdate(id, updateBookDto, {
        new: true,
        runValidators: true,
      })
      .orFail(new NotFoundException('Book not found'))
      .exec();

  findByIdAndDelete = (id: string | Types.ObjectId) =>
    this.model.findByIdAndDelete(id);

  create = (createBookDto: CreateBookDto, userId: string | Types.ObjectId) =>
    this.model.create({ ...createBookDto, user: userId });
}
