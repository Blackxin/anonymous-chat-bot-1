"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const BotCommand_decorator_1 = require("../../decorators/BotCommand.decorator");
const ChatProxy_1 = require("../../services/chat/ChatProxy");
class BaseController {
    search(message) {
        const chatProxyService = new ChatProxy_1.default();
        return {
            message: chatProxyService.searchChat({ id: message.from_id })
        };
    }
    stop(message) {
        const chatProxyService = new ChatProxy_1.default();
        return {
            message: chatProxyService.stopChat({ id: message.from_id })
        };
    }
}
tslib_1.__decorate([
    (0, BotCommand_decorator_1.BotCommand)('/поиск'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Object)
], BaseController.prototype, "search", null);
tslib_1.__decorate([
    (0, BotCommand_decorator_1.BotCommand)('/стоп'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Object)
], BaseController.prototype, "stop", null);
exports.default = BaseController;
//# sourceMappingURL=ChatController.js.map