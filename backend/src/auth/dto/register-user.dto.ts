import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail({}, { message: 'Must be a valid email address.' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  @MaxLength(30)
  password: string;
}