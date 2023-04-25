import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  yearPublication: number;

  @ApiProperty()
  @IsNotEmpty()
  publisher: string;

  @ApiProperty()
  @IsNotEmpty()
  imageUrlS: string;

  @ApiProperty()
  @IsNotEmpty()
  imageUrlM: string;

  @ApiProperty()
  @IsNotEmpty()
  imageUrlL: string;
}
