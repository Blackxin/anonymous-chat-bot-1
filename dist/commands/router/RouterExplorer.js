"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const utils_1 = require("../../common/utils");
class RouterExplorer {
    constructor(metadataScanner) {
        this.metadataScanner = metadataScanner;
    }
    explore(controllers, applicationRef) {
        controllers.forEach((controller) => {
            const routerPaths = this.scanForPaths(controller);
            routerPaths.forEach((path) => {
                this.applyCallbackToRouter(path, applicationRef);
            });
        });
    }
    scanForPaths(instance, prototype) {
        const instancePrototype = (0, utils_1.isUndefined)(prototype)
            ? Object.getPrototypeOf(instance)
            : prototype;
        return this.metadataScanner.scanFromPrototype(instance, instancePrototype, method => this.exploreMethodMetadata(instance, instancePrototype, method));
    }
    exploreMethodMetadata(instance, prototype, methodName) {
        const instanceCallback = instance[methodName];
        const prototypeCallback = prototype[methodName];
        const path = Reflect.getMetadata(constants_1.PATH_METADATA, prototypeCallback);
        if ((0, utils_1.isUndefined)(path)) {
            return null;
        }
        return {
            path,
            targetCallback: instanceCallback,
            methodName,
        };
    }
    applyCallbackToRouter(routeDefinition, commandHandler) {
        const { path, targetCallback } = routeDefinition;
        commandHandler.addCommand(path, targetCallback);
    }
}
exports.default = RouterExplorer;
//# sourceMappingURL=RouterExplorer.js.map