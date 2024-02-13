import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/_utils/dto/requests/create-user.dto';
import { UserDocument } from 'src/users/user.schema';
import Stripe from 'stripe';

@Injectable()
export class CustomersService {
  constructor(@InjectStripeClient() private readonly stripeClient: Stripe) {}

  checkCients = () => this.stripeClient.customers.list();

  registerCustomer = (createUserDto: CreateUserDto) =>
    this.stripeClient.customers.create({
      name: createUserDto.name,
      email: createUserDto.email,
      phone: '0102030405',
    });
}
