import { ICommandHandler } from "@payment/common/src";
import { FailPayingCommand } from "../FailPayingCommand";
import { IPaymentRepositoryModule } from "@ioc/decorator";
import { IPaymentRepository } from "@domain/IPaymentRepository";

export class FailPayingCommandHandler implements ICommandHandler<FailPayingCommand>
{
    command: string = FailPayingCommand.name;
    constructor(
        @IPaymentRepositoryModule private _repository: IPaymentRepository,
    ) {

    }
    async Handle(command: FailPayingCommand): Promise<void> {
        const { paymentId, message, version } = command;

        // get payment
        const payment = await this._repository.findById(paymentId);
        if (payment === null) {
            throw new Error("");
        }

        payment.paymentFail(message);
        await this._repository.create(payment, version);
    }

}