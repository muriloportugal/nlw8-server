import { NextFunction, Request, Response } from 'express';

export function requireOrigin(
  req: Request,
  resp: Response,
  next: NextFunction,
) {
  const origensPermitidas = process.env.CORS_ORIGIN || '';
  const allow = origensPermitidas
    .split(';')
    .some(origem => origem === req.headers.origin);
  if (!allow) {
    return resp.status(400).json({ message: 'Not allowed' });
  }
  next();
}
