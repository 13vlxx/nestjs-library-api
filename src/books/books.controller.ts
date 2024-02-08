import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { BooksService } from './books.service';
import { CreateBookDto } from './_utils/dto/requests/create-book.dto';
import { UpdateBookDto } from './_utils/dto/requests/update-book.dto';
import { Book, BookDocument } from './book.schema';
import { AuthGuard } from '@nestjs/passport';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { GetBooksDto } from './_utils/dto/responses/get-books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  getAllBooks(@Query() query: ExpressQuery): Promise<GetBooksDto[]> {
    return this.booksService.findAll(query);
  }

  @Get(':id')
  getBookById(@Param('id') id: string): Promise<Book> {
    return this.booksService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('new')
  createBook(@Body() createBookDto: CreateBookDto, @Req() req): Promise<Book> {
    return this.booksService.create(createBookDto, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/update')
  updateById(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.updateById(id, updateBookDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/delete')
  deleteById(@Param('id') id: string, @Req() req): Promise<BookDocument> {
    return this.booksService.deleteById(id, req.user);
  }
}
