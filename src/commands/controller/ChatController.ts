import { BotCommand } from "../../decorators/BotCommand.decorator";
import VkBotReply from "../../common/helpers/interfaces/VkBotReply.interface";
import BotCommandControllerInterface from "../interfaces/BotCommandController.interface";
import ChatProxy from "../../services/chat/ChatProxy";

export default class BaseController implements BotCommandControllerInterface{
    @BotCommand('/поиск')
    search (message: VkBotMessage): VkBotReply|undefined{
        const chatProxyService = new ChatProxy()
        return {
            message: chatProxyService.searchChat({id: message.from_id})
        }
    }

    @BotCommand('/стоп')
    stop (message: VkBotMessage): VkBotReply|undefined{
        const chatProxyService = new ChatProxy()
        return {
            message: chatProxyService.stopChat({id: message.from_id})
        }
    }
}
