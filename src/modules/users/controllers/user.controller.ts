import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddRatingDto } from '../dto/add-rating.dto';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('my-user')
  myUser(@Req() request: any): Promise<any> {
    return this.usersService.myUser(request['user'].id);
  }

  @Post('add-rating')
  addRating(
    @Req() request: any,
    @Body() addRating: AddRatingDto,
  ): Promise<any> {
    return this.usersService.addRating(+request['user'].id, addRating);
  }
}
