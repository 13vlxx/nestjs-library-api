import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDocument } from 'src/users/user.schema';
import Stripe from 'stripe';
import { CancelSubscriptionDto } from '../_utils/dto/requests/cancel-subscription.dto';
import { CreateSessionDto } from '../_utils/dto/requests/create-session.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectStripeClient() private readonly stripeClient: Stripe,
    private readonly configService: ConfigService,
  ) {}

  async subscribeToProductByPriceId(
    createSessionDto: CreateSessionDto,
    user: UserDocument,
  ) {
    const session = await this.stripeClient.checkout.sessions.create({
      success_url: 'https://google.com',
      cancel_url: 'https://facebook.com',
      line_items: [
        {
          price: createSessionDto.priceId,
          quantity: createSessionDto.numberOfLicence,
        },
      ],
      mode: 'subscription',
      customer: user.stripeCustomerId,
    });

    return session.url;
  }

  async cancelSubscription(
    cancelSubscriptionDto: CancelSubscriptionDto,
    user: UserDocument,
  ) {
    return user;
  }
}
