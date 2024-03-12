import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  findUserById = (id: string | Types.ObjectId) => this.model.findById(id);

  findUserByIdAndUpdate = (userId, stripeId: string) =>
    this.model.findByIdAndUpdate(userId, { stripeCustomerId: stripeId });

  findUserByEmail = (email: string) => this.model.findOne({ email }).exec();

  register = (
    name: string,
    email: string,
    password: string,
    stripeId: string,
  ) =>
    this.model.create({
      name,
      email,
      password: password,
      stripeCustomerId: stripeId,
    });

  delete = (userId: string) => this.model.findByIdAndDelete(userId).exec();
}
