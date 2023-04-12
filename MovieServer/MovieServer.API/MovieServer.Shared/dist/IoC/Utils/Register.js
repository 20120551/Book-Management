"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
function RegisterController(bind, constructor) {
    bind(inversify_express_utils_1.TYPE.Controller)
        .to(constructor)
        .whenTargetNamed(constructor.name);
}
exports.RegisterController = RegisterController;
