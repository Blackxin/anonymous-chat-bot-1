import {
    Member,
    MemberIndexedCollection
} from "./interfaces/Chat.interface";
import { isUndefined } from "../../common/utils";
import { bot } from "../../app";

let membersInActiveSearch: MemberIndexedCollection = {};
let activeProxyDialogs: MemberIndexedCollection = {};

export default class ChatProxy {
    searchChat(member: Member): string {
        if (this.isDialogProxyActive(member)) return "Чат уже активен. Если вы хотите завершить диалог, введите команду '/стоп'";
        if (this.isSearchActive(member)) return "Поиск уже активен";

        const randomMemberInActiveSearch:Member|undefined = this.getRandomMemberInActiveSearch()
        if (isUndefined(randomMemberInActiveSearch)) {
            membersInActiveSearch[member.id] = member;
            return "Поиск диалога. Если вы хотите остановить поиск, введите команду '/стоп'"
        }

        delete membersInActiveSearch[randomMemberInActiveSearch.id];

        activeProxyDialogs[member.id] = randomMemberInActiveSearch;
        activeProxyDialogs[randomMemberInActiveSearch.id] = member;

        const text = "Собеседник найден. Чтобы остановить диалог, введите команду '/стоп'";

        bot.sendMessage(randomMemberInActiveSearch.id, text)

        return text;
    }

    stopChat(member: Member): string {
        if (this.isDialogProxyActive(member)) {
            const interlocutor: Member = activeProxyDialogs[member.id];

            delete activeProxyDialogs[member.id];
            delete activeProxyDialogs[interlocutor.id];

            const text = "Диалог остановлен. Чтобы снова начать поиск собеседника, введите команду '/поиск'"
            bot.sendMessage(interlocutor.id, text)
            return text;
        }

        if (this.isSearchActive(member)) {
            delete membersInActiveSearch[member.id]
            return "Поиск остановлен. Чтобы снова начать поиск собеседника, введите команду '/поиск'";
        }

        return "Поиск уже неактивен. Чтобы начать поиск собеседника, введите команду '/поиск'";
    }

    proxyMessage(member: Member, message: VkBotMessage): string|undefined {
        if (member.id in activeProxyDialogs) {
            const interlocutor = activeProxyDialogs[member.id]
            let{text, attachments} = message;

            let interlocutorAttachments: string[] = [];
            attachments.forEach((attachment:VkBotAttachment) => {
                switch (attachment.type) {
                    case "photo":
                    case "audio":
                    case "video":
                        let attachmentString = attachment.type + attachment[attachment.type].owner_id + "_" + attachment[attachment.type].id
                        if ('access_key' in attachment[attachment.type]) {attachmentString += '_' + attachment[attachment.type]['access_key']}
                        interlocutorAttachments.push(attachmentString);
                        break;
                }
            });

            if (text.length>0 || interlocutorAttachments.length>0){
                bot.sendMessage(interlocutor.id, text, interlocutorAttachments)
            } else {
                return "Ошибка: неподдерживаемое вложение или текст"
            }
        }

        return undefined;
    }

    isSearchActive(member: Member): boolean {
        return member.id in membersInActiveSearch;
    }

    isDialogProxyActive(member: Member) {
        return member.id in activeProxyDialogs;
    }

    getRandomMemberInActiveSearch(): Member|undefined {
        const keys = Object.keys(membersInActiveSearch);
        if (keys.length === 0) return undefined;
        return membersInActiveSearch[keys[ keys.length * Math.random() << 0]]
    }
}
