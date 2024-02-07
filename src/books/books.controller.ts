import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { BooksService } from './books.service';
import { CreateBookDto } from './_utils/dto/requests/create-book.dto';
import { UpdateBookDto } from './_utils/dto/requests/update-book.dto';
import { Book } from './schemas/book.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.booksService.findAll(query);
  }

  @Get(':id')
  getBookById(@Param('id') id: string): Promise<Book> {
    return this.booksService.findById(id);
  }

  @Post('new')
  createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Patch(':id/update')
  updateById(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.updateById(id, updateBookDto);
  }

  @Delete(':id/delete')
  deleteById(@Param('id') id: string): Promise<Book> {
    return this.booksService.deleteById(id);
  }
}
