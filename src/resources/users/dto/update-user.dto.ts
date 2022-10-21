import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ValidationMessage } from 'src/common/constants/validation.message';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,}$/, {
    message: ValidationMessage.password,
  })
  password: string;
}
