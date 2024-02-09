import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    NestjsFormDataModule.config({ isGlobal: true, storage: MemoryStoredFile }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    BooksModule,
    UsersModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
