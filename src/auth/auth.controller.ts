import { Body, Catch, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/_utils/dto/requests/create-user.dto';
import { LoginUserDto } from 'src/users/_utils/dto/requests/login-user.dto';
import { GetUserDto } from 'src/users/_utils/dto/responses/get-user.dto';
import { GetLoggedUserDto } from './_utils/dto/responses/get-logged-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a new account' })
  register(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    return this.authService.register(createUserDto);
  }

  @ApiOperation({ summary: 'Login to your account' })
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Promise<GetLoggedUserDto> {
    return this.authService.login(loginUserDto);
  }
}
