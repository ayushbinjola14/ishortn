import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

const base62Encode = (num: number): string => {
  const base62 =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  let current = num;

  if (current === 0) {
    return base62[0];
  }

  while (current > 0) {
    result = base62[current % 62] + result;
    current = Math.floor(current / 62);
  }

  return result;
};

const generateSHA256Hash = (data: string): string => {
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return hash;
};

export const generateShortUrl = async (url: string): Promise<string> => {
  const hash = generateSHA256Hash(url);
  const hashInt = parseInt(hash.substr(0, 8), 16);
  const shortUrl = base62Encode(hashInt);
  const existingUrl = await prisma.link.findUnique({
    where: { short_code: shortUrl },
  });

  if (existingUrl) {
    return generateShortUrl(url); // Generate a new short URL recursively until it's unique
  }

  return shortUrl;
};

export const getOriginalUrl = async (shortUrl: string): Promise<string> => {
  const url = await prisma.link.findUnique({
    where: { short_code: shortUrl },
  });

  if (!url) {
    throw new Error('URL not found');
  }

  return url.original_url;
};
