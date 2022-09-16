import { BotCommand } from "../../decorators/BotCommand.decorator";
import VkBotReply from "../../common/helpers/interfaces/VkBotReply.interface";
import BotCommandControllerInterface from "../interfaces/BotCommandController.interface";

export default class LifeCheckController implements BotCommandControllerInterface{
    @BotCommand('/пинг')
    ping (message: VkBotMessage): VkBotReply|undefined{
        return {
            message: 'понг'
        }
    }

    @BotCommand('/кинг')
    king (message: VkBotMessage): VkBotReply|undefined{
        return {
            message: 'конг'
        }
    }
}
