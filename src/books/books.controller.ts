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
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { BooksService } from './books.service';
import { CreateBookDto } from './_utils/dto/requests/create-book.dto';
import { UpdateBookDto } from './_utils/dto/requests/update-book.dto';
import { Book, BookDocument } from './book.schema';
import { GetBookDto } from './_utils/dto/responses/get-book.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Protect } from 'src/auth/_utils/decorators/protect.decorator';
import { ConnectedUser } from 'src/auth/_utils/decorators/connected-user.decorator';
import { UserDocument } from '@users/user.schema';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  @ApiOperation({ summary: 'Fetch all books' })
  getAllBooks(@Query() query: ExpressQuery): Promise<GetBookDto[]> {
    return this.booksService.findAll(query);
  }

  // @CacheTTL(300)
  // @UseInterceptors(CacheInterceptor)
  @Get(':id')
  @ApiOperation({ summary: 'Fetch book by id' })
  getBookById(@Param('id') id: string): Promise<BookDocument> {
    return this.booksService.findById(id);
  }

  @Protect()
  @Post('new')
  @ApiOperation({ summary: 'Create a new book' })
  createBook(
    @Body() createBookDto: CreateBookDto,
    @ConnectedUser() user: UserDocument,
  ): Promise<Book> {
    return this.booksService.create(createBookDto, user);
  }

  @Protect()
  @Patch(':id/update')
  @ApiOperation({ summary: 'Update a book by id' })
  updateById(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.updateById(id, updateBookDto);
  }

  @Protect()
  @Delete(':id/delete')
  @ApiOperation({ summary: 'Delete a book by id' })
  deleteById(
    @Param('id') id: string,
    @ConnectedUser() user: UserDocument,
  ): Promise<BookDocument> {
    return this.booksService.deleteById(id, user);
  }
}
