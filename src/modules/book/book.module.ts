import { Module } from '@nestjs/common';
import { BookService } from './services/book.service';
import { BookController } from './controllers/book.controller';
import { DatabaseModule } from '../../database/database.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  providers: [BookService, JwtService],
})
export class BookModule {}
