import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { EmailModule } from './email/email.module';
import { PaymentsModule } from './payments/payments.module';
import { StripeModule } from '@golevelup/nestjs-stripe';

@Module({
  imports: [
    StripeModule.forRootAsync(StripeModule, {
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_PUBILC_KEY'),
        webhookConfig: {
          stripeSecrets: {
            account: configService.get('STRIPE_SECRET_KEY'),
          },
          requestBodyProperty: 'rawBody',
        },
      }),
      inject: [ConfigService],
    }),
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
    EmailModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
