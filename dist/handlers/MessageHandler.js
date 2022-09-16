"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChatProxy_1 = require("../services/chat/ChatProxy");
const utils_1 = require("../common/utils");
class CommandHandler {
    handle(ctx) {
        const member = { id: ctx.message.from_id };
        const chatProxyService = new ChatProxy_1.default();
        if (chatProxyService.isDialogProxyActive(member)) {
            chatProxyService.proxyMessage(member, ctx.message);
            const reply = chatProxyService.proxyMessage(member, ctx.message);
            if (!(0, utils_1.isUndefined)(reply)) {
                return { message: reply };
            }
            return undefined;
        }
        return { message: "Диалог неактивен. Чтобы начать поиск собеседника, введите команду '/поиск'" };
    }
}
exports.default = CommandHandler;
//# sourceMappingURL=MessageHandler.js.map