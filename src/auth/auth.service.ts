import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/_utils/dto/requests/create-user.dto';
import { LoginUserDto } from 'src/users/_utils/dto/requests/login-user.dto';
import { GetUserDto } from 'src/users/_utils/dto/responses/get-user.dto';
import { UserDocument } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';
import { GetLoggedUserDto } from './_utils/dto/responses/get-logged-user.dto';
import { JwtPayload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<GetUserDto> {
    const user = await this.usersService.createUser(createUserDto);

    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<GetLoggedUserDto> {
    const user = await this.usersService.loginUser(loginUserDto);
    return {
      user,
      token: this.createToken(user),
    };
  }

  async deleteAccount(user: UserDocument) {
    await this.usersService.deleteUser(user._id.toString());
    return {
      status: 'ok',
      message: 'user deleted successfully',
    };
  }

  private createToken(user: GetUserDto) {
    const payload: JwtPayload = {
      id: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
