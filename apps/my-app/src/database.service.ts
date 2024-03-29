import { Injectable } from '@nestjs/common';
import { MongoClient, Db,Collection ,InsertOneResult } from 'mongodb';
import { mongoURL } from './database.config';

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
            this.client = await MongoClient.connect(mongoURL);
            this.db = this.client.db();
            this.userCollection = this.db.collection('test/users');
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
