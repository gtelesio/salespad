import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ReplyRequestDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  leadId: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
