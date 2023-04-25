import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { PrismaService } from '../../../database/prisma.service';
import { Book } from '../entities/book.entity';
import * as moment from 'moment';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
  async create(createRoomDto: CreateBookDto): Promise<Book> {
    const newBook = await this.prisma.book.create({
      data: { ...new Book(createRoomDto) },
    }); // create a new Book
    return new Book(newBook);
  }

  async findAll(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }
  async findOne(id: string): Promise<Book> {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return new Book({ ...book });
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    await this.prisma.book.update({
      where: { id },
      data: { ...updateBookDto },
    });
    return new Book({ ...book, ...updateBookDto });
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.book.update({
      where: { id },
      data: { deletedAt: moment().utc().format() },
    });
    return true; // soft delete the book
  }
}
