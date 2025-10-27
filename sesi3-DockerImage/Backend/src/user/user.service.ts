import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from './dto/user-dto';
import { AddUserDTO } from './dto/add-user-dto';
import { Role, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<UserDTO[]> {
    return this.prisma.user.findMany();
  }

  async findUserById(id: number): Promise<UserDTO> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }

  async addUser(userData: AddUserDTO): Promise<UserDTO> {
    const newUser = await this.prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role as Role,
      },
    });

    return {
      id: newUser.id,
      name: newUser.name,
      password: newUser.password,
      email: newUser.email,
      role: newUser.role,
      profileImageUrl: newUser.profileImageUrl,
    };
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
