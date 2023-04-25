import { DatabaseModule } from '../../../database/database.module';
import { JwtService } from '@nestjs/jwt';
import { BookController } from './book.controller';
import { BookService } from '../services/book.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('BookController', () => {
  let controller: BookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService, JwtService],
      imports: [DatabaseModule],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
