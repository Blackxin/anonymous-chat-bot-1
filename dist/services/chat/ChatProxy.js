"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../common/utils");
const app_1 = require("../../app");
let membersInActiveSearch = {};
let activeProxyDialogs = {};
class ChatProxy {
    searchChat(member) {
        if (this.isDialogProxyActive(member))
            return "Чат уже активен. Если вы хотите завершить диалог, введите команду '/стоп'";
        if (this.isSearchActive(member))
            return "Поиск уже активен";
        const randomMemberInActiveSearch = this.getRandomMemberInActiveSearch();
        if ((0, utils_1.isUndefined)(randomMemberInActiveSearch)) {
            membersInActiveSearch[member.id] = member;
            return "Поиск диалога. Если вы хотите остановить поиск, введите команду '/стоп'";
        }
        delete membersInActiveSearch[randomMemberInActiveSearch.id];
        activeProxyDialogs[member.id] = randomMemberInActiveSearch;
        activeProxyDialogs[randomMemberInActiveSearch.id] = member;
        const text = "Собеседник найден. Чтобы остановить диалог, введите команду '/стоп'";
        app_1.bot.sendMessage(randomMemberInActiveSearch.id, text);
        return text;
    }
    stopChat(member) {
        if (this.isDialogProxyActive(member)) {
            const interlocutor = activeProxyDialogs[member.id];
            delete activeProxyDialogs[member.id];
            delete activeProxyDialogs[interlocutor.id];
            const text = "Диалог остановлен. Чтобы снова начать поиск собеседника, введите команду '/поиск'";
            app_1.bot.sendMessage(interlocutor.id, text);
            return text;
        }
        if (this.isSearchActive(member)) {
            delete membersInActiveSearch[member.id];
            return "Поиск остановлен. Чтобы снова начать поиск собеседника, введите команду '/поиск'";
        }
        return "Поиск уже неактивен. Чтобы начать поиск собеседника, введите команду '/поиск'";
    }
    proxyMessage(member, message) {
        if (member.id in activeProxyDialogs) {
            const interlocutor = activeProxyDialogs[member.id];
            let { text, attachments } = message;
            let interlocutorAttachments = [];
            attachments.forEach((attachment) => {
                switch (attachment.type) {
                    case "photo":
                    case "audio":
                    case "video":
                        let attachmentString = attachment.type + attachment[attachment.type].owner_id + "_" + attachment[attachment.type].id;
                        if ('access_key' in attachment[attachment.type]) {
                            attachmentString += '_' + attachment[attachment.type]['access_key'];
                        }
                        interlocutorAttachments.push(attachmentString);
                        break;
                }
            });
            if (text.length > 0 || interlocutorAttachments.length > 0) {
                app_1.bot.sendMessage(interlocutor.id, text, interlocutorAttachments);
            }
            else {
                return "Ошибка: неподдерживаемое вложение или текст";
            }
        }
        return undefined;
    }
    isSearchActive(member) {
        return member.id in membersInActiveSearch;
    }
    isDialogProxyActive(member) {
        return member.id in activeProxyDialogs;
    }
    getRandomMemberInActiveSearch() {
        const keys = Object.keys(membersInActiveSearch);
        if (keys.length === 0)
            return undefined;
        return membersInActiveSearch[keys[keys.length * Math.random() << 0]];
    }
}
exports.default = ChatProxy;
//# sourceMappingURL=ChatProxy.js.map