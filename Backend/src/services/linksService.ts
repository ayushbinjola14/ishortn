import { PrismaClient, Prisma } from '@prisma/client';
import { generateShortUrl } from '../utils/encodingUtils';
import {
  getClientPlatformDetails,
  getCountryFromIP,
} from '../utils/linksUtils';

const prisma = new PrismaClient();

export type Link = Prisma.LinkGetPayload<{
  select: { original_url: true; short_code: true };
}>;

export const getLinkInfo = async (shortUrl: string): Promise<Link> => {
  const url = await prisma.link.findUnique({
    where: { short_code: shortUrl },
  });

  return (url as Link) || null;
};

export const createLink = async (
  originalUrl: string,
  userId: number,
): Promise<string> => {
  const existingUrl = await prisma.link.findFirst({
    where: { original_url: originalUrl },
    select: { short_code: true },
  });

  const shortUrl =
    existingUrl?.short_code || (await generateShortUrl(originalUrl));

  const url = await prisma.link.create({
    data: {
      original_url: originalUrl,
      short_code: shortUrl,
      user_id: userId,
    },
  });

  return url.short_code;
};

export const deleteLink = async (shortUrl: string, userId: number) => {
  await prisma.link.delete({
    where: { short_code: shortUrl, user_id: userId },
  });
};

export const getAllLinks = async (user_id: number): Promise<Link[]> => {
  // TODO: Add pagination
  // TODO: RETURN ONLY LINKS CREATED BY THE USER
  const urls = await prisma.link.findMany({
    where: { user_id: user_id },
  });

  return urls;
};

export const insertLinkStats = async (
  shortUrl: string,
  userAgent: string,
  ip: string,
  referrer: string,
) => {
  const link = await prisma.link.findUnique({
    where: { short_code: shortUrl },
  });

  const country = await getCountryFromIP(ip);
  const deviceInfo = await getClientPlatformDetails(userAgent);

  await prisma.click.create({
    data: {
      link: { connect: { link_id: link!.link_id } },
      ip_address: ip,
      country: country,
      referrer: referrer || '',
      browser: deviceInfo.browser || '',
      platform: deviceInfo.platform || '',
      platformVerion: deviceInfo.version || '',
    },
  });
};
