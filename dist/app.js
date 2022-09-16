"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
require("reflect-metadata");
const node_vk_bot_api_1 = require("node-vk-bot-api");
const ConfigManager_1 = require("./common/helpers/ConfigManager");
const CommandHandler_1 = require("./handlers/CommandHandler");
const MessageHandler_1 = require("./handlers/MessageHandler");
const utils_1 = require("./common/utils");
exports.bot = new node_vk_bot_api_1.default({
    token: ConfigManager_1.default.getEnv('BOT_TOKEN')
});
const commandHandler = new CommandHandler_1.default();
const messageHandler = new MessageHandler_1.default();
exports.bot.use(async (ctx, next) => {
    try {
        await next();
    }
    catch (e) {
        console.error(e);
    }
});
exports.bot.event('message_new', (ctx) => {
    var _a;
    let reply;
    if ((_a = ctx.message.text) === null || _a === void 0 ? void 0 : _a.startsWith('/')) {
        reply = commandHandler.handle(ctx);
    }
    else {
        reply = messageHandler.handle(ctx);
    }
    if (!(0, utils_1.isUndefined)(reply)) {
        const { message, attachment, markup, sticker } = reply;
        ctx.reply(message, attachment, markup, sticker);
    }
});
exports.bot.startPolling((err) => {
    if (err) {
        console.error(err);
    }
    return {};
});
//# sourceMappingURL=app.js.map