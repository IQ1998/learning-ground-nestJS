import { NextFunction, Request, Response } from 'express';

export function parseReqQuery(req: Request, res: Response, next: NextFunction) {
  const queryOptions = req.query;
  const { skip, take } = queryOptions;
  if (queryOptions.skip && typeof skip === 'string') {
    (queryOptions.skip as any) = parseInt(skip, 10);
  }
  if (queryOptions.take && typeof take === 'string') {
    (queryOptions.take as any) = parseInt(take, 10);
  }

  return next();
}
