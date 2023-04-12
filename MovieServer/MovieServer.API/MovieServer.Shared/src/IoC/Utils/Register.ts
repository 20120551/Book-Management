import { interfaces } from "inversify";
import { TYPE } from "inversify-express-utils";

export function RegisterController<TController>(
    bind: interfaces.Bind,
    constructor: interfaces.Newable<TController>
) {
    bind<TController>(TYPE.Controller)
        .to(constructor)
        .whenTargetNamed(constructor.name)
}