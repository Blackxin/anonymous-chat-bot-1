import VkBotReply from "../common/helpers/interfaces/VkBotReply.interface";
import { Member } from "../services/chat/interfaces/Chat.interface";
import ChatProxy from "../services/chat/ChatProxy";
import { isUndefined } from "../common/utils";

export default class CommandHandler {
    public handle (ctx: VkBotContext): VkBotReply|undefined {
        const member: Member = {id: ctx.message.from_id}
        const chatProxyService = new ChatProxy();
        if (chatProxyService.isDialogProxyActive(member)) {
            chatProxyService.proxyMessage(member, ctx.message);
            const reply = chatProxyService.proxyMessage(member, ctx.message)
            if (!isUndefined(reply)) {
                return {message: reply}
            }
            return undefined;
        }

        return {message: "Диалог неактивен. Чтобы начать поиск собеседника, введите команду '/поиск'"}
    }
}
