import 'reflect-metadata';
import VkBot from "node-vk-bot-api"
import ConfigManager from "./common/helpers/ConfigManager";
import CommandHandler from "./handlers/CommandHandler";
import MessageHandler from "./handlers/MessageHandler";
import VkBotReply from "./common/helpers/interfaces/VkBotReply.interface";
import { isUndefined } from './common/utils';

export const bot = new VkBot({
    token: ConfigManager.getEnv('BOT_TOKEN')
});

const commandHandler = new CommandHandler();
const messageHandler = new MessageHandler();

bot.use(async (ctx: VkBotContext, next: any|undefined) => {
    try {
        await next();
    } catch (e) {
        console.error(e);
    }
});

bot.event('message_new', (ctx:VkBotContext) => {
    let reply: VkBotReply|undefined
    if (ctx.message.text?.startsWith('/')) {
        reply = commandHandler.handle(ctx);
    } else {
        reply = messageHandler.handle(ctx);
    }

    if (!isUndefined(reply)) {
        const {message, attachment, markup, sticker} = reply;
        ctx.reply(message, attachment, markup, sticker)
    }
})

bot.startPolling((err: any) => {
    if (err) {
        console.error(err);
    }

    return {};
});
