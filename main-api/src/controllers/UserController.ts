// backend/main-api/src/controllers/UserController.ts
import messageBroker from '../../../shared/messaging/MessageBroker';
import { IMessage, IUser } from '../../../shared/common/types';
import bcrypt from 'bcrypt';

import { Request, Response } from 'express';
import { IUserModel, UserModel } from '../models/UserModel';






const sendLoginMessage = (email: string, password: string) => {
    const message: IMessage = {
      action: 'login',
      data: { email, password },
    };
    messageBroker.sendMessage('auth-queue', message);
  };





export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: IUserModel = await UserModel.create({ email, password });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при создании пользователя' });
  }
};




export const login = async (req: Request, res: Response) => {
  try {
    // Логика авторизации
    sendLoginMessage(req.body.email, req.body.password);

    res.status(200).json({ message: 'Успешная авторизация' });
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при авторизации' });
  }
};
