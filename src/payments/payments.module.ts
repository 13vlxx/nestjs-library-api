import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { ConfigService } from '@nestjs/config';
import { CustomersService } from './services/customers.service';

@Module({
  imports: [
    StripeModule.forRootAsync(StripeModule, {
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_SECRET_KEY'),
        webhookConfig: {
          stripeSecrets: {
            account: configService.get('STRIPE_WEBHOOK_SECRET'),
          },
          requestBodyProperty: 'rawBody',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, CustomersService],
  exports: [PaymentsService, CustomersService],
})
export class PaymentsModule {}
