import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { ConfigService } from '@nestjs/config';
import { CustomersService } from './services/customers.service';
import { StripeService } from './services/stripe.service';
import { SubscriptionService } from './services/subscriptions.service';
import { WebHooksService } from './services/web-hooks.service';
import { UsersModule } from 'src/users/users.module';

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
    UsersModule,
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    CustomersService,
    StripeService,
    SubscriptionService,
    WebHooksService,
  ],
  exports: [PaymentsService, CustomersService],
})
export class PaymentsModule {}
