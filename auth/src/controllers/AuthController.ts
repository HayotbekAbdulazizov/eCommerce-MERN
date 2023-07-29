// backend/auth-service/src/controllers/AuthController.ts
import messageBroker from '../../../shared/messaging/MessageBroker';
import { IMessage, IUser } from '../../../shared/common/types';
import bcrypt from 'bcrypt';


const handleLoginMessage = async (email: string, password: string) => {
  try {
    // Логика авторизации
    const user: IUser = await UserModel.findOne({ email });

    if (!user) {
      // Отправка сообщения об ошибке авторизации
      const errorMessage: IMessage = {
        action: 'login-error',
        data: { message: 'Пользователь не найден' },
      };
      messageBroker.sendMessage('auth-error-queue', errorMessage);
    } else {
      // Отправка сообщения об успешной авторизации
      const successMessage: IMessage = {
        action: 'login-success',
        data: { message: 'Успешная авторизация' },
      };
      messageBroker.sendMessage('auth-success-queue', successMessage);
    }
  } catch (error) {
    console.error('Ошибка при авторизации:', error);
  }
};

// Прослушивание очереди auth-queue для авторизации
messageBroker.receiveMessage('auth-queue', (message) => {
  if (message.action === 'login') {
    const { email, password } = message.data;
    handleLoginMessage(email, password);
  }
});
