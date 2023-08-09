// THIS FILE HOLDS ALL THE FUNCTIONS THAT ARE USED TO INTERACT WITH THE USER TABLE IN THE DATABASE

import { PrismaClient, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/authUtils';

const prisma = new PrismaClient();

type User = Prisma.UserGetPayload<{
  select: {
    user_id: true;
    email: true;
    password: true;
    name: true;
    created_at: true;
  };
}>;

// Check if a user exists in the database
export const checkUser = async (email: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return !!user;
};

// Create a new user in the database
export const createUser = async (
  email: string,
  password: string,
  name: string,
): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      email,
      password: await hashPassword(password),
      name,
    },
  });
  return user;
};

// Get a user from the database
export const getUser = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};
