import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { AuthGuard } from '../../../core/guards/auth.guard';

@Controller('book')
@ApiTags('book')
// @ApiBearerAuth()
// @UseGuards(AuthGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: 'create book' })
  create(@Body() createbookDto: CreateBookDto) {
    return this.bookService.create(createbookDto);
  }

  @Get()
  @ApiOperation({ summary: 'list books' })
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get one book' })
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update one book' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'soft delete one book' })
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
