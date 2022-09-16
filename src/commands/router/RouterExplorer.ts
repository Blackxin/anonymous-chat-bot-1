import { MetadataScanner } from "../../common/helpers/MetadataScanner";
import BotCommandControllerInterface from "../interfaces/BotCommandController.interface";
import { PATH_METADATA } from "../../constants";
import { isUndefined } from '../../common/utils';
import CommandHandler from "../../handlers/CommandHandler";
import BotCommandInterface from "../interfaces/BotCommand.interface";

interface RouteDefinition {
    path: string;
    targetCallback: BotCommandInterface;
    methodName: string;
}

export default class RouterExplorer {
    constructor(
        private readonly metadataScanner: MetadataScanner,
    ) { }

    public explore<T extends CommandHandler>(
        controllers: BotCommandControllerInterface[],
        applicationRef: T
    ) {
        controllers.forEach((controller:BotCommandControllerInterface) => {
            const routerPaths = this.scanForPaths(controller);
            routerPaths.forEach((path:RouteDefinition) => {
                this.applyCallbackToRouter(
                    path,
                    applicationRef
                );
            })
        })

    }

    public scanForPaths(
        instance: BotCommandControllerInterface,
        prototype?: object,
    ): RouteDefinition[] {
        const instancePrototype = isUndefined(prototype)
            ? Object.getPrototypeOf(instance)
            : prototype;

        return this.metadataScanner.scanFromPrototype<BotCommandControllerInterface, RouteDefinition>(
            instance,
            instancePrototype,
            method => this.exploreMethodMetadata(instance, instancePrototype, method),
        );
    }

    public exploreMethodMetadata(
        instance: BotCommandControllerInterface,
        prototype: object,
        methodName: string,
    ): RouteDefinition {
        const instanceCallback = instance[methodName];
        const prototypeCallback = prototype[methodName];
        const path = Reflect.getMetadata(PATH_METADATA, prototypeCallback);

        if (isUndefined(path)) {
            return null;
        }

        return {
            path,
            targetCallback: instanceCallback,
            methodName,
        };
    }

    private applyCallbackToRouter<T extends CommandHandler>(
        routeDefinition: RouteDefinition,
        commandHandler: T
    ) {
        const {
            path,
            targetCallback
        } = routeDefinition;

        commandHandler.addCommand(path, targetCallback)
    }
}
