import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private userData: { [key: string]: CreateUserDto } = {};

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.userData['user'] = createUserDto; 
    return this.userData;
  }

  @Get()
  findAll() {
    return Object.values(this.userData);
  }


  @Get(':email')
  findOne(@Param('email') email: string) {
    console.log("userData",this.userData)
    return this.userData[email] || 'User not found';
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    if (this.userData[email]) {
      this.userData[email] = { ...this.userData[email], ...updateUserDto };
      return this.userData[email];
    }
    return 'User not found';
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    if (this.userData[email]) {
      delete this.userData[email];
      return 'User deleted successfully';
    }
    return 'User not found';
  }
}
