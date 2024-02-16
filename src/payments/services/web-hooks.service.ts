import {
  InjectStripeClient,
  StripeWebhookHandler,
} from '@golevelup/nestjs-stripe';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import Stripe from 'stripe';

@Injectable()
export class WebHooksService {
  constructor(
    @InjectStripeClient() private readonly stripeClient: Stripe,
    private readonly usersRepository: UsersRepository,
  ) {}

  @StripeWebhookHandler('checkout.session.completed')
  async handleCheckoutSessionCompleted(evt: Stripe.Event) {
    console.log('e');
  }

  async handleEvent(payload: any) {
    try {
      if (payload.type === 'payment_intent.succeeded') {
        const user = await this.usersRepository.register(
          'test',
          'test',
          'test@gmail.com',
          'qsdqsdqsdqd',
        );
        console.log(user);
      }
    } catch (error) {
      console.error('Error handling webhook event:', error);
      throw error;
    }
  }
}
