import { Controller, Get } from '@nestjs/common';
import { MyAppService } from './my-app.service';
import { DatabaseService } from './database.service';

@Controller()
export class MyAppController {
  constructor(private readonly dbService: DatabaseService) {}

    @Get()
    async getData(): Promise<any> {
        try {
            const db = this.dbService.getDatabase();
            const collection = db.collection('');
            const data = await collection.find({}).toArray();
            return data;
        } catch (error) {
            throw error;
        }
    }
}
