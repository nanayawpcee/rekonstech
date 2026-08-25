import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { serviceCategoryOptions } from '../../content/site.content';

const CATEGORY_SLUGS = serviceCategoryOptions.map((option) => option.value);

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class CreateServiceRequestDto {
  @Transform(trim)
  @IsString()
  @Length(2, 120, { message: 'Please enter your full name.' })
  fullName!: string;

  @Transform(trim)
  @IsString()
  @Matches(/^[+()\d][\d\s().-]{5,24}$/, {
    message: 'Please enter a valid phone number.',
  })
  phone!: string;

  @IsIn(CATEGORY_SLUGS, { message: 'Please choose a service category.' })
  serviceCategory!: string;

  @IsOptional()
  @Transform(trim)
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email?: string;

  @IsOptional()
  @Transform(trim)
  @IsString()
  @MaxLength(1000)
  message?: string;

  /**
   * Honeypot: hidden from humans via CSS, irresistible to naive bots.
   * Any value here means the submission is silently discarded.
   */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  company?: string;
}
