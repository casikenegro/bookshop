import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddRatingDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  bookId: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  rating: number;
}
