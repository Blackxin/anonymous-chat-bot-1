import VkBotReply from "../common/helpers/interfaces/VkBotReply.interface";
export default class CommandHandler {
    handle(ctx: VkBotContext): VkBotReply | undefined;
}
