// backend/shared/messaging/MessageBroker.ts
import amqp from 'amqplib';
import { IMessage } from '../common/types';

const RABBITMQ_URL = 'amqp://localhost';

class MessageBroker {
  private channel: amqp.Channel | null = null;

  async connect() {
    try {
      const connection = await amqp.connect(RABBITMQ_URL);
      this.channel = await connection.createChannel();
    } catch (error) {
      console.error('Ошибка подключения к RabbitMQ:', error);
    }
  }

  async sendMessage(queue: string, message: IMessage) {
    try {
      if (this.channel) {
        await this.channel.assertQueue(queue);
        await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      }
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
    }
  }

  async receiveMessage(queue: string, callback: (message: IMessage) => void) {
    try {
      if (this.channel) {
        await this.channel.assertQueue(queue);
        await this.channel.consume(queue, (msg) => {
          if (msg) {
            const message = JSON.parse(msg.content.toString()) as IMessage;
            callback(message);
            this.channel!.ack(msg);
          }
        });
      }
    } catch (error) {
      console.error('Ошибка приема сообщения:', error);
    }
  }
}

export default new MessageBroker();
