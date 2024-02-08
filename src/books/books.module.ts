import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { AuthModule } from 'src/auth/auth.module';
import { BooksRepository } from './books.repository';
import { BooksMapper } from './books.mapper';
import { UsersMapper } from 'src/users/users.mapper';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    UsersModule,
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, BooksMapper],
})
export class BooksModule {}
