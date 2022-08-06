import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import Inertia from './inertia';

export function inertiaMiddleware(req: Request, res: Response, next: NextFunction) {
  res.inertia = new Inertia(req, res);
  if (!res.inertia.checkVersion()) {
    return
  }
  next();
}

@Injectable()
export class InertiaMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.inertia = new Inertia(req, res);
    if (!res.inertia.checkVersion()) {
      return
    }
    next();
  }
}