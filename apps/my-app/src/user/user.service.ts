// src/user/user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId,InsertOneResult, FindOneAndUpdateOptions } from 'mongodb';

@Injectable()
export class UserService {
    constructor(private readonly dbService: DatabaseService) {}

    async create(createUserDto: CreateUserDto) {
        try {
          const userCollection = this.dbService.getUserCollection();
          const result = await userCollection.insertOne(createUserDto);
          console.log('result',result)
          return result; 
        } catch (error) {
            throw new Error('Failed to create Record.');
        }
    }

    async findAll(): Promise<any[]> {
        try {
            const userCollection = this.dbService.getUserCollection();
            return await userCollection.find({}).toArray();
        } catch (error) {
            throw new Error('Failed to fetch Records.');
        }
    }

    async findOne(id: string): Promise<any> {
        try {
            const userCollection = this.dbService.getUserCollection();
            const user = await userCollection.findOne({ _id: new ObjectId(id) });
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
            const userCollection = this.dbService.getUserCollection();
            const result = await userCollection.findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: updateUserDto },
                { returnOriginal: false } as FindOneAndUpdateOptions
            );
            if (!result.value) {
                throw new NotFoundException('Record not found.');
            }
            return result.value;
        } catch (error) {
            throw new Error('Failed to update Record.');
        }
    }

    async remove(id: string) {
        try {
            const userCollection = this.dbService.getUserCollection();
            await userCollection.deleteOne({ _id: new ObjectId(id) });
            return {
                statusCode: 204,
                message: 'No Available Content for this Request',
            };
        } catch (error) {
            throw new Error('Failed to remove Record.');
        }
    }
}
