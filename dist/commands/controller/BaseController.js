"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const BotCommand_decorator_1 = require("../../decorators/BotCommand.decorator");
class BaseController {
    start(message) {
        console.log(message);
        return {
            message: "Чтобы начать поиск собеседника, отправьте боту команду '/поиск'"
        };
    }
    echo(message) {
        let textParts = message.text.split(' ');
        textParts.shift();
        return {
            message: textParts.join(' '),
        };
    }
}
tslib_1.__decorate([
    (0, BotCommand_decorator_1.BotCommand)('/старт'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Object)
], BaseController.prototype, "start", null);
tslib_1.__decorate([
    (0, BotCommand_decorator_1.BotCommand)('/echo'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Object)
], BaseController.prototype, "echo", null);
exports.default = BaseController;
//# sourceMappingURL=BaseController.js.map