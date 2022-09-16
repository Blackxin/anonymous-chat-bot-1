import VkBotReply from "../../common/helpers/interfaces/VkBotReply.interface";
import BotCommandControllerInterface from "../interfaces/BotCommandController.interface";
export default class BaseController implements BotCommandControllerInterface {
    search(message: VkBotMessage): VkBotReply | undefined;
    stop(message: VkBotMessage): VkBotReply | undefined;
}
