import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateLeadRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  contactInfo: string;
}
