import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SolidPasswordDecorator } from 'src/auth/_utils/decorators/solid-password.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @SolidPasswordDecorator()
  readonly password: string;
}
