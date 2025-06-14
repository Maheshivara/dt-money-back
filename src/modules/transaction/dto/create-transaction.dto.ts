import { TransactionType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsISO8601,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTransactionDto {
  @IsString({ message: 'title must be a string' })
  @MinLength(5, { message: 'title must be at least 5 characters long' })
  title: string;
  @IsString({ message: 'category must be a string' })
  @MinLength(3, { message: 'category must be at least 3 characters long' })
  category: string;
  @IsISO8601(
    { strict: true },
    { message: 'date must be a valid ISO8601 string' },
  )
  data: string;
  @IsNumber({}, { message: 'price must be a number' })
  price: number;
  @IsEnum(TransactionType)
  type: TransactionType;
}
