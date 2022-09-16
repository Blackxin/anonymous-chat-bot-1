import { BotCommand } from "../../decorators/BotCommand.decorator";
import VkBotReply from "../../common/helpers/interfaces/VkBotReply.interface";
import BotCommandControllerInterface from "../interfaces/BotCommandController.interface";

export default class BaseController implements BotCommandControllerInterface{
    @BotCommand('/старт')
    start (message: VkBotMessage): VkBotReply|undefined{
        console.log(message);
        return {
            message: "Чтобы начать поиск собеседника, отправьте боту команду '/поиск'"
        }
    }

    @BotCommand('/echo')
    echo (message: VkBotMessage): VkBotReply|undefined{
        let textParts = message.text.split(' ')
        textParts.shift();
        return {
            message: textParts.join(' '),
        }
    }
}
