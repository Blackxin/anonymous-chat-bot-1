"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const utils_1 = require("../utils");
class ConfigManager {
}
exports.default = ConfigManager;
ConfigManager.getEnv = (name) => {
    let env = process.env[name];
    if ((0, utils_1.isUndefined)(env))
        throw new Error(`Undefined environmental variable with name ${name}`);
    return env;
};
//# sourceMappingURL=ConfigManager.js.map