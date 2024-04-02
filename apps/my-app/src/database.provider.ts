// import { Provider } from '@nestjs/common';
// import { DatabaseService } from './database.service';
// import { environment } from './environments/environment';

// export const databaseServiceProvider: Provider = {
//     provide: DatabaseService,
//     useFactory: async () => {
//         const dbService = new DatabaseService();
//         const mongoURL = environment.production ? process.env.PRODUCTION_MONGO_URL : process.env.DEVELOPMENT_MONGO_URL;
//         await dbService.connect(mongoURL); 
//         return dbService;
//     },
// };

