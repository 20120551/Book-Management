import amqp from 'amqplib';
export type AMQPConnection = amqp.Connection;
export type AMQPChannel = amqp.Channel;
export declare function GetAmqpClient(amqpUrl: string): Promise<AMQPConnection>;
