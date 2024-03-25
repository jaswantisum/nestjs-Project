import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as npmlog from 'npmlog';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
       
    const dtoData = req.body;
    // console.log('dtoData',dtoData)
    res.on('finish', () => {     
      npmlog.info(JSON.stringify(dtoData));
    });

    next();
  }
}
