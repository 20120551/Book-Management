import amqp from 'amqplib';

export type AMQPConnection = amqp.Connection;
export type AMQPChannel = amqp.Channel;

//function for connect to amqp rabbitmq
export async function GetAmqpClient(amqpUrl: string): Promise<AMQPConnection> {
    try {
        const conn = await amqp.connect(amqpUrl);
        console.log(`connect to amqp server successfully with url ${amqpUrl}`);
        return conn;
    } catch (err) {
        console.log(`error when trying to connect to amqp server with url ${amqpUrl}`);
        throw err;
    }
}