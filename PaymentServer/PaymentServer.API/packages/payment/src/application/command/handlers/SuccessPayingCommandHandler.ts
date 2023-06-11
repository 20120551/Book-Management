import { ICommandHandler } from "@payment/common/src";
import { SuccessPayingCommand } from "../SuccessPayingCommand";
import { IPaymentRepositoryModule } from "@ioc/decorator";
import { IPaymentRepository } from "@domain/IPaymentRepository";

export class SuccessPayingCommandHandler implements ICommandHandler<SuccessPayingCommand>
{
    command: string = SuccessPayingCommand.name;

    constructor(
        @IPaymentRepositoryModule private _repository: IPaymentRepository,
    ) {

    }
    async Handle(command: SuccessPayingCommand): Promise<void> {
        const payment = await this._repository.findById(command.paymentId);
        if (payment === null) {
            throw new Error();
        }

        payment.paymentSucceeded();
        await this._repository.create(payment, command.version);
    }

}