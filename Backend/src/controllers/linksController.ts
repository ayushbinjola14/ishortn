import { NextFunction, Request, Response } from 'express';
import {
  createLink,
  getLinkInfo,
  insertLinkStats,
} from '../services/linksService';
import { CustomError } from '../middleware/errorHandling';

export const GetLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { shortUrl } = req.params;
  const linkInformation = await getLinkInfo(shortUrl);
  if (!linkInformation) {
    return next(new CustomError(404, 'Link not found'));
  }
  res.status(200).json(linkInformation);
};

export const Redirect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  insertLinkStats(
    req.params.shortUrl,
    req.headers['user-agent']!,
    // req.ip, TODO: UNCOMMENT THIS WHEN DEPLOYING TO PRODUCTION
    '9.9.9.9',
    req.headers['referrer'] as string,
  );

  const { shortUrl } = req.params;
  const originalUrl = (await getLinkInfo(shortUrl)).original_url;
  if (!originalUrl) {
    return next(new CustomError(404, 'Link not found'));
  }
  res.redirect(301, originalUrl);
};

export const ShortenLink = async (req: Request, res: Response) => {
  const { originalUrl } = req.body;
  // TODO: VALIDATE WITH JOI
  if (!originalUrl) {
    throw new Error('Missing URL');
  }
  const shortUrl = await createLink(originalUrl, 1);
  res.status(200).json({ shortUrl });
};
