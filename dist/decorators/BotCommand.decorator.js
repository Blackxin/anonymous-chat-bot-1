"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotCommand = void 0;
const constants_1 = require("../constants");
const BotCommand = (name) => {
    if (!name.startsWith('/'))
        throw new Error("Invalid command name: must starts with '/' symbol");
    return (target, key, descriptor) => {
        Reflect.defineMetadata(constants_1.PATH_METADATA, name, descriptor.value);
        return descriptor;
    };
};
exports.BotCommand = BotCommand;
//# sourceMappingURL=BotCommand.decorator.js.map