import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Channel } from '@/leads/domain/entities/lead.entity';

export class CreateLeadRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  contactInfo: string;

  @IsEnum(Channel)
  @IsOptional()
  channel?: Channel;
}
