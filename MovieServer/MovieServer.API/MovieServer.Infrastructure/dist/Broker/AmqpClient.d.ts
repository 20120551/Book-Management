import amqp from 'amqplib';
export declare type AMQPConnection = amqp.Connection;
export declare type AMQPChannel = amqp.Channel;
export declare function GetAmqpClient(amqpUrl: string): Promise<AMQPConnection>;
//# sourceMappingURL=AmqpClient.d.ts.map