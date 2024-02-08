import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { BooksRepository } from './books.repository';
import { BooksMapper } from './books.mapper';
import { UsersModule } from 'src/users/users.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register({
      ttl: 300000,
    }),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    UsersModule,
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
    BooksRepository,
    BooksMapper,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class BooksModule {}
