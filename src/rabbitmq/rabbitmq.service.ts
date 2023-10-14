import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib/callback_api';

@Injectable()
export class RabbitmqService {
  RMQ_URL = process.env.RABBITMQ_URL;

  public RMQ_ReceiveMessage(queue: string): void {
    amqp.connect(this.RMQ_URL, (error0, connection) => {
      if (error0) {
        throw error0;
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }

        channel.assertQueue(queue, {
          durable: false,
        });

        console.log(
          ' [*] Waiting for messages in %s. To exit press CTRL+C',
          queue,
        );
        channel.consume(
          queue,
          (msg) => {
            console.log(' [x] Received %s', msg.content.toString());
          },
          {
            noAck: true,
          },
        );
      });
    });
  }

  public RMQ_SendMessage(queue: string, msg: any): void {
    amqp.connect(this.RMQ_URL, (error0, connection) => {
      if (error0) {
        throw error0;
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
        console.log(' [x] Sent %s', msg);

        setTimeout(() => connection.close(), 500);
      });
    });
  }
}
