import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSessionDto } from '../_utils/dto/requests/create-session.dto';
import { UserDocument } from 'src/users/user.schema';
import { ConfigService } from '@nestjs/config';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import { CancelSubscriptionDto } from '../_utils/dto/requests/cancel-subscription.dto';

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
