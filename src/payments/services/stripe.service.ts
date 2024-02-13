import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  constructor(@InjectStripeClient() private readonly stripeClient: Stripe) {}

  findAllActiveProducts = () => this.stripeClient.products.list();
}
