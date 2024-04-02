import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  BadRequestException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpCode } from '@nestjs/common';
import { TimestampToDatePipe } from 'y/common/pipe/timeStampeToDate';

import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new TimestampToDatePipe())
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      if (!user) {
        throw new BadRequestException('Record Not Created');
      }
      return {data:user, message:"Record Created Successfully"}
    } catch (err) {
      throw err;
    }
  }

  @Get()
  async findAll() {
    try {
      const user = await this.userService.findAll();
      if (!user || user.length === 0) {
        throw new NotFoundException(`Record not found`);
      }
      return {data:user, message:"Records Found Successfully"}
    } catch (err) {
      throw err;
    }
  }
  @UsePipes(new TimestampToDatePipe())
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      if (id === undefined || id === 'undefined' || !id) {
        throw new BadRequestException('ID parameter is required');
      }
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new NotFoundException(`Record with ID ${id} not found`);
      }
      return {data:user, message:"Record Found Successfully"}
    } catch (err) {
      throw err;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      if (id === 'undefined' || !id) {
        throw new BadRequestException('ID parameter is required');
      }
      const finduser = await this.userService.findOne(id);
      if (!finduser) {
        throw new NotFoundException(`Record with ID ${id} not found`);
      }
      const updateUser = await this.userService.update(id, updateUserDto);
      if (!updateUser) {
        throw new BadRequestException(`Failed to update Record with ID ${id}`);
      }
      return {data:updateUser, message:"Record Updated Successfully"}
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    try {
      const finduser = await this.userService.findOne(id);

      if (!finduser) {
        throw new NotFoundException(`Record with ID ${id} not found`);
      }
      await this.userService.remove(id);

      return {
        data: HttpStatus.NO_CONTENT,
        message: 'Record deleted successfully',
      };
      
    } catch (err) {
      throw err;
    }
  }
}
