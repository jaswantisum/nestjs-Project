import { Controller, Get } from '@nestjs/common';
import { MyAppService } from './my-app.service';
import { DatabaseService } from './database.service';

@Controller()
export class MyAppController {
  constructor() {}

    @Get()
    async getData(): Promise<any> {
        try {
            
        } catch (error) {
            throw error;
        }
    }
}
