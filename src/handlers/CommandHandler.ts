import VkBotReply from "../common/helpers/interfaces/VkBotReply.interface";
import BotCommandInterface from "../commands/interfaces/BotCommand.interface";
import RouterExplorer from "../commands/router/RouterExplorer";
import { MetadataScanner } from "../common/helpers/MetadataScanner";
import BotCommandControllerInterface from "../commands/interfaces/BotCommandController.interface";
import BaseController from "../commands/controller/BaseController";
import LifeCheckController from "../commands/controller/LifeCheckController";
import ChatController from "../commands/controller/ChatController";
import { isUndefined } from '../common/utils';

export default class CommandHandler {
    private availableBotCommands: {[index: string]: BotCommandInterface} = {};
    private isCommandListLoaded: boolean = false;
    private controllers: BotCommandControllerInterface[] = []

    constructor(
    ) {
        this.controllers.push(
            new BaseController(),
            new LifeCheckController(),
            new ChatController()
        )
    }

    public handle (ctx: VkBotContext): VkBotReply|undefined {
        if(!this.isCommandListLoaded){
            const routerExplorer = new RouterExplorer(
                new MetadataScanner()
            );
            routerExplorer.explore(this.controllers, this)
        }

        const commandParts: string[]|undefined = ctx.message.text?.split(' ');
        if (
            !isUndefined(commandParts) &&
            commandParts.length !== 0 &&
            commandParts[0].startsWith('/')
        ) {
            const commandName = commandParts[0];

            if (commandName in this.availableBotCommands) {
                const command: BotCommandInterface = this.availableBotCommands[commandName];
                return command(ctx.message);
            } else {
                return {
                    message: "Ошибка: такой команды не существует"
                };
            }
        }
    }

    public addCommand(name: string, command: BotCommandInterface) {
        this.availableBotCommands[name] = command;
    }
}
