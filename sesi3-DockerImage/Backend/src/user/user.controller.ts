import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { UserDTO } from './dto/user-dto';
import { AddUserDTO } from './dto/add-user-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtPayload } from 'src/auth/interfaces/payload/jwt-payload';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserDTO[]> {
    try {
      const users = await this.usersService.getUsers();
      return users;
    } catch (e) {
      throw new InternalServerErrorException('Could not retrieve users: ' + e);
    }
  }

  @UseGuards(AuthGuard)
  @Get('current')
  async getCurrentUser(@Req() req: Request): Promise<UserDTO> {
    const tokenPayload = req.user as JwtPayload;

    if (!tokenPayload || !tokenPayload.sub) {
      console.error('User payload or sub missing from request after AuthGuard');
      throw new InternalServerErrorException('User identification failed.');
    }

    try {
      const user = await this.usersService.findUserById(tokenPayload.sub);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Current user not found.');
      }
      throw new InternalServerErrorException(
        'Could not retrieve user profile.',
      );
    }
  }

  @Post('register')
  async registerUser(@Body() userData: AddUserDTO): Promise<UserDTO> {
    try {
      const user = await this.usersService.addUser(userData);
      return user;
    } catch (e) {
      throw new InternalServerErrorException('Could not add user: ' + e);
    }
  }
}
