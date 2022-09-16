import VkBotReply from "../../common/helpers/interfaces/VkBotReply.interface";
import BotCommandControllerInterface from "../interfaces/BotCommandController.interface";
export default class BaseController implements BotCommandControllerInterface {
    start(message: VkBotMessage): VkBotReply | undefined;
    echo(message: VkBotMessage): VkBotReply | undefined;
}
