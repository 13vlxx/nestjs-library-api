import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/_utils/dto/requests/create-user.dto';
import { UserDocument } from 'src/users/user.schema';
import Stripe from 'stripe';

@Injectable()
export class CustomersService {
  constructor(@InjectStripeClient() private readonly stripeClient: Stripe) {}

  checkCients = () => this.stripeClient.customers.list();

  registerCustomer = (createUserDto: CreateUserDto) =>
    this.stripeClient.customers
      .create({
        name: createUserDto.name,
        email: createUserDto.email,
        phone: '0102030405',
      })
      .catch(() => {
        throw new BadRequestException('STRIPE_CUSTOMER_NOT_CREATED');
      });

  updateCustomer = (user: UserDocument) => {
    if (!user.stripeCustomerId)
      throw new BadRequestException('CUSTOMER_ID_NOT_VALID');

    return this.stripeClient.customers.update(user.stripeCustomerId, {
      phone: 'No phone number',
    });
  };

  deleteCustomer = (customerId: string) => {
    if (!customerId) throw new BadRequestException('CUSTOMER_ID_NOT_VALID');
    this.stripeClient.customers.del(customerId);
  };
}
