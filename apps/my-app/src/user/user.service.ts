import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly users = [];

  async create(createUserDto: CreateUserDto): Promise<{}> {
    try {
      console.log('createUserDto',createUserDto)
      const newUser = {
        id: (this.users.length + 1).toString(),
        ...createUserDto,
      };
      this.users.push(newUser);
      return newUser;
    } catch (error) {
      throw new Error('Failed to create Record.');
    }
  }

  async findAll(): Promise<any[]> {
    try {
      return this.users;
    } catch (error) {
      throw new Error('Failed to fetch Record.');
    }
  }

  async findOne(id: string): Promise<{}> {
    try {
      const user = this.users.find((user) => user.id === id);
      if (!user) {
        throw new NotFoundException('Record not found.');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to find Record.');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const index = this.users.findIndex((user) => user.id === id);
      if (index === -1) {
        throw new NotFoundException('Record not found.');
      }
      this.users[index] = {
        ...this.users[index],
        ...updateUserDto,
      };
      return this.users[index];
    } catch (error) {
      throw new Error('Failed to update Record.');
    }
  }

  async remove(id: string) {
    try {
      return {
        statusCode: 204,
        message: 'No Available Content for this Request',
      };
    } catch (error) {
      throw new Error('Failed to remove Record.');
    }
  }
}
