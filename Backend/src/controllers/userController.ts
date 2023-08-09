import { Request, Response } from 'express';
import Joi from 'joi';

import { checkUser, createUser, getUser } from '../services/userService';
import { User } from '../types';
import { comparePassword } from '../utils/authUtils';
import _ from 'lodash';

export const validateUser = (user: User) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
  });
  return schema.validate(user);
};

export const Register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const doesUserExist = await checkUser(email);
  if (doesUserExist) {
    res.status(409).json({
      message: 'User already exists',
    });
  }
  const user = await createUser(email, password, name);
  res.status(201).json({
    user: _.omit(user, ['password', 'created_at']),
  });
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const doesUserExist = await checkUser(email);
  if (!doesUserExist) {
    return res.status(401).json({
      message: 'User does not exist',
    });
  }

  const user = await getUser(email);
  if (!user) {
    return res.status(401).json({
      message: 'Invalid email',
    });
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: 'Invalid email or password',
    });
  }

  res.status(200).json({
    user: _.omit(user, ['password', 'created_at']),
  });
};
