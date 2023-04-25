import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { User } from '@prisma/client';
import { AddRatingDto } from '../dto/add-rating.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async myUser(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
  async addRating(userId: number, ratingDto: AddRatingDto): Promise<boolean> {
    await this.prisma.booksRating.create({
      data: {
        userId,
        bookId: ratingDto.bookId,
        rating: ratingDto.rating,
      },
    });
    return true;
  }
}
