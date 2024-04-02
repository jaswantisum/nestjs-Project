import { Injectable } from '@nestjs/common';
import { MongoClient, Db, Collection, InsertOneResult } from 'mongodb';

import { environment } from '../../../libs/common/src/environments/environment';

@Injectable()
export class DatabaseService {
  private client: MongoClient;
  private db: Db;
  private userCollection: Collection<any>;
  constructor() {
    this.connect();
  }

  private async connect(): Promise<void> {
    try {
      
      const mongoURL = environment.production
        ? process.env.PRODUCTION_MONGO_URL
        : process.env.DEVELOPMENT_MONGO_URL;
      this.client = await MongoClient.connect(mongoURL);
      this.db = await this.client.db();
      console.log()
      this.userCollection = await this.db.collection('users');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  getDatabase(): Db {
    return this.db;
  }
  getUserCollection(): Collection<any> {
    return this.userCollection;
  }
}
