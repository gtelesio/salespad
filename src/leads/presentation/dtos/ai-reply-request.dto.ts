import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AiReplyRequestDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  leadId: string;
  // potentially other options in the future
}
