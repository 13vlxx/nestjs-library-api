import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  findUserById = (id: string | ObjectId) => this.model.findById(id);

  findUserByEmail = (email: string) => this.model.findOne({ email }).exec();

  register = (name: string, email: string, password: string) =>
    this.model.create({ name, email, password: password });
}
