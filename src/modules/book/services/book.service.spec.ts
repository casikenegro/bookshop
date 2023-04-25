import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '../../../database/database.module';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService, JwtService],
      imports: [DatabaseModule],
    }).compile();
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return book object', async () => {
    const newBook = {
      title: 'string',
      author: 'string',
      yearPublication: 2023,
      publisher: 'string',
      imageUrlS: 'string',
      imageUrlM: 'string',
      imageUrlL: 'string',
    };
    const book = await service.create({ ...newBook });
    expect(book).toMatchObject({
      id: expect.any(String),
      ...newBook,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      deletedAt: null,
    });
  });

  it('should return books', async () => {
    const books = await service.findAll();
    expect(books).toEqual(expect.any(Array));
  });

  it('should return book', async () => {
    const book = await service.findOne('1');
    expect(book).toEqual(expect.any(Object));
  });
});
