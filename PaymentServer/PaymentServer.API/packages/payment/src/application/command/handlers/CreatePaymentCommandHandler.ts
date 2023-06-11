import {
    ICacheServiceModule, CreatePaymentResource, Customer, ICacheService,
    ICommandHandler, IPaymentCheckoutSessionFactoryModule, Injectable, IConsulClientModule, IConsulClient
} from "@payment/common";
import { CreatePayment } from "../CreatePaymentCommand";
import { IPaymentRepositoryModule } from "@ioc/decorator";
import { IPaymentRepository } from "@domain/IPaymentRepository";
import { IPaymentCheckoutSessionFactory } from "@payment/common";
import { PayState, PayType, Payment } from "@domain/Payment";
import { nanoid } from "nanoid";
import { ConsulServiceAuthentication, OrderResponse } from "@application/module";
import { order, payment as paymentConfig } from "@config/index";

@Injectable
export class CreatePaymentCommandHandler implements ICommandHandler<CreatePayment> {
    command: string = CreatePayment.name;

    constructor(
        @IConsulClientModule private _consulClient: IConsulClient,
        @ICacheServiceModule private _cache: ICacheService,
        @IPaymentCheckoutSessionFactoryModule private _factory: IPaymentCheckoutSessionFactory,
        @IPaymentRepositoryModule private _repository: IPaymentRepository,
    ) {

    }
    async Handle(command: CreatePayment): Promise<void> {
        const paymentId = nanoid();
        const baseUrl = paymentConfig.serviceProtocal + "://" +
            paymentConfig.serviceAddress + ":" + paymentConfig.servicePort

        // const orderServer = "http://localhost:5009/api/order";
        // get order id --> service discovery
        // const orderDetail = await (await fetch(orderServer + `/${command.orderId}`)).json();
        const { userId, orderId, payType } = command;
        const claims = await this._cache.get<ConsulServiceAuthentication>(userId, ConsulServiceAuthentication);

        if (claims === null) {
            throw new Error();
        }
        // get consul client
        const orderDetail = await this._consulClient.get<OrderResponse>(order.serviceName, {
            protocal: order.serviceProtocal,
            endPoint: `/api/order/${orderId}`,
            user: claims
        }, OrderResponse);

        // prepare parameter
        const totalPrice = 1000;
        const expirationAt = 5 * 60 * 1000; // 5 minutes
        const _paytype = payType as PayType;
        // create session
        const session = this._factory.create(_paytype);

        // create payment resource
        const paymentResource = new CreatePaymentResource(
            paymentId, command.orderId, new Customer(command.userId, orderDetail.Receiver.Address), expirationAt,
            baseUrl + `/success`, baseUrl + "/fail")
        paymentResource.addProducts(orderDetail.Movies.map(movie => {
            return { name: movie.Name, price: movie.Price, quantity: movie.Quantity }
        }));

        const { url, paymentId: payUrlId } = await session.create(paymentResource);

        // add payment
        const payment = new Payment(
            paymentId, command.orderId, totalPrice,
            _paytype, PayState.Init, url, command.userId, new Date(), payUrlId);

        await this._repository.create(payment, -1);
    }

}