import VkBotReply from "../common/helpers/interfaces/VkBotReply.interface";
import BotCommandInterface from "../commands/interfaces/BotCommand.interface";
export default class CommandHandler {
    private availableBotCommands;
    private isCommandListLoaded;
    private controllers;
    constructor();
    handle(ctx: VkBotContext): VkBotReply | undefined;
    addCommand(name: string, command: BotCommandInterface): void;
}
