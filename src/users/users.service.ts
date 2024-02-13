import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './_utils/dto/requests/create-user.dto';
import { LoginUserDto } from './_utils/dto/requests/login-user.dto';
import { UsersRepository } from './users.repository';
import { UsersMapper } from './users.mapper';
import { UserDocument } from './user.schema';
import { GetUserDto } from './_utils/dto/responses/get-user.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly emailService: EmailService,
    private readonly usersMapper: UsersMapper,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    stripeId?: string,
  ): Promise<GetUserDto> {
    const { name, email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.register(
      name,
      email,
      hashedPassword,
      (stripeId = null),
    );

    this.emailService.sendRegistrationConfirmationEmail({
      toEmail: email,
      subject: 'Welcome to our library !',
      content: `Hello ${name}`,
    });

    return this.usersMapper.toGetUserDto(user);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<GetUserDto> {
    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    const arePasswordMatching = await bcrypt.compare(password, user.password);
    if (!arePasswordMatching)
      throw new UnauthorizedException('Incorrect email or password');
    return this.usersMapper.toGetUserDto(user);
  }

  async returnUserById(id: string): Promise<UserDocument> {
    return this.usersRepository.findUserById(id);
  }

  async addCustomerId(userId: string, stripeId: string) {
    return await this.usersRepository.findUserByIdAndUpdate(userId, stripeId);
  }
}
