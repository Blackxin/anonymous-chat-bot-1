import VkBotReply from "../../common/helpers/interfaces/VkBotReply.interface";
export default interface BotCommandInterface {
    (message: VkBotMessage): VkBotReply | undefined;
}
