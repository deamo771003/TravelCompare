import { Response } from 'express';

export class BaseController {
  protected sendResponses(res: Response, data?: object, statusCode: number = 200): void {
    res.status(statusCode).json(data);
  }
}
