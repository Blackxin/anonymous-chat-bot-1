import { Member } from "./interfaces/Chat.interface";
export default class ChatProxy {
    searchChat(member: Member): string;
    stopChat(member: Member): string;
    proxyMessage(member: Member, message: VkBotMessage): string | undefined;
    isSearchActive(member: Member): boolean;
    isDialogProxyActive(member: Member): boolean;
    getRandomMemberInActiveSearch(): Member | undefined;
}
