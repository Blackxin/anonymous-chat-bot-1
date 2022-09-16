import VkBotReply from "../../common/helpers/interfaces/VkBotReply.interface";
import BotCommandControllerInterface from "../interfaces/BotCommandController.interface";
export default class LifeCheckController implements BotCommandControllerInterface {
    ping(message: VkBotMessage): VkBotReply | undefined;
    king(message: VkBotMessage): VkBotReply | undefined;
}
