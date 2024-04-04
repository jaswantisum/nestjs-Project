import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { Address } from './schema/address.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Address.name) private readonly addressModel: Model<Address>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
  
    try {
      const { address, ...userData } = createUserDto;
      // const existingUser = await this.findbyEmail(createUserDto.email);

      // if (existingUser) {
      //   throw new BadRequestException('Email already exists');
      // }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = { ...createUserDto, password: hashedPassword };

      const createdAddress = new this.addressModel(address);
      const savedAddress = await createdAddress.save();

      const createdUser = new this.userModel({
        ...newUser,
        address: savedAddress._id,
      });
      return createdUser.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().populate('address').exec();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user= await this.userModel.findById(id).populate('address').exec();
      console.log('user',user)
      return user
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.userModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw error;
    }
  }

  async findbyEmail(email: string) {
    try {
      const findbyEmail = await this.userModel.findOne({ email }).exec();

      return findbyEmail;
    } catch (error) {
      throw error;
    }
  }
}
