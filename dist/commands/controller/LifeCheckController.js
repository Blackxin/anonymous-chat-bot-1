"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const BotCommand_decorator_1 = require("../../decorators/BotCommand.decorator");
class LifeCheckController {
    ping(message) {
        return {
            message: 'понг'
        };
    }
    king(message) {
        return {
            message: 'конг'
        };
    }
}
tslib_1.__decorate([
    (0, BotCommand_decorator_1.BotCommand)('/пинг'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Object)
], LifeCheckController.prototype, "ping", null);
tslib_1.__decorate([
    (0, BotCommand_decorator_1.BotCommand)('/кинг'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Object)
], LifeCheckController.prototype, "king", null);
exports.default = LifeCheckController;
//# sourceMappingURL=LifeCheckController.js.map