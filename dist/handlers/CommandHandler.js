"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RouterExplorer_1 = require("../commands/router/RouterExplorer");
const MetadataScanner_1 = require("../common/helpers/MetadataScanner");
const BaseController_1 = require("../commands/controller/BaseController");
const LifeCheckController_1 = require("../commands/controller/LifeCheckController");
const ChatController_1 = require("../commands/controller/ChatController");
const utils_1 = require("../common/utils");
class CommandHandler {
    constructor() {
        this.availableBotCommands = {};
        this.isCommandListLoaded = false;
        this.controllers = [];
        this.controllers.push(new BaseController_1.default(), new LifeCheckController_1.default(), new ChatController_1.default());
    }
    handle(ctx) {
        var _a;
        if (!this.isCommandListLoaded) {
            const routerExplorer = new RouterExplorer_1.default(new MetadataScanner_1.MetadataScanner());
            routerExplorer.explore(this.controllers, this);
        }
        const commandParts = (_a = ctx.message.text) === null || _a === void 0 ? void 0 : _a.split(' ');
        if (!(0, utils_1.isUndefined)(commandParts) &&
            commandParts.length !== 0 &&
            commandParts[0].startsWith('/')) {
            const commandName = commandParts[0];
            if (commandName in this.availableBotCommands) {
                const command = this.availableBotCommands[commandName];
                return command(ctx.message);
            }
            else {
                return {
                    message: "Ошибка: такой команды не существует"
                };
            }
        }
    }
    addCommand(name, command) {
        this.availableBotCommands[name] = command;
    }
}
exports.default = CommandHandler;
//# sourceMappingURL=CommandHandler.js.map