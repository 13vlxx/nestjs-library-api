import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { Protect } from 'src/auth/_utils/decorators/protect.decorator';
import { StripeService } from './services/stripe.service';
import { CreateSessionDto } from './_utils/dto/requests/create-session.dto';
import { ConnectedUser } from 'src/auth/_utils/decorators/connected-user.decorator';
import { UserDocument } from 'src/users/user.schema';
import { SubscriptionService } from './services/subscriptions.service';
import { CancelSubscriptionDto } from './_utils/dto/requests/cancel-subscription.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Protect()
  @Get('products')
  getAllProducts() {
    return this.stripeService.findAllActiveProducts();
  }

  @Protect()
  @Post('subscription')
  createSubscription(
    @Body() createSessionDto: CreateSessionDto,
    @ConnectedUser() user: UserDocument,
  ) {
    return this.subscriptionService.subscribeToProductByPriceId(
      createSessionDto,
      user,
    );
  }

  @Protect()
  @Delete('subscription')
  cancelSubscription(
    @Body() cancelSubscriptionDto: CancelSubscriptionDto,
    @ConnectedUser() user: UserDocument,
  ) {
    return this.subscriptionService.cancelSubscription(
      cancelSubscriptionDto,
      user,
    );
  }
}
