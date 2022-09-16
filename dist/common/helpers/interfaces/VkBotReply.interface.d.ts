export default interface VkBotReply {
    message: string;
    attachment?: string | string[];
    markup?: VkBotKeyboard;
    sticker?: number | string;
}
