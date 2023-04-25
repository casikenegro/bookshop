import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty()
  createdAt?: Date | string;
  @ApiProperty()
  updatedAt?: Date | string;
  @ApiProperty()
  deletedAt?: Date | string;
}
