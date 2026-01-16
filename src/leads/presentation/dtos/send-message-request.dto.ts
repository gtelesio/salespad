import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SendMessageRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  leadId: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
