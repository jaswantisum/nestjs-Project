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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpCode } from '@nestjs/common';
import { TimestampToDatePipe } from '../pipe/timeStampeToDate';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes( new TimestampToDatePipe())
  @Post()
  async create(@Body() createUserDto: CreateUserDto,) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
  @UsePipes(new TimestampToDatePipe()) 
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
