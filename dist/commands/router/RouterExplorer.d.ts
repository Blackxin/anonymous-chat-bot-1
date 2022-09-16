import { MetadataScanner } from "../../common/helpers/MetadataScanner";
import BotCommandControllerInterface from "../interfaces/BotCommandController.interface";
import CommandHandler from "../../handlers/CommandHandler";
import BotCommandInterface from "../interfaces/BotCommand.interface";
interface RouteDefinition {
    path: string;
    targetCallback: BotCommandInterface;
    methodName: string;
}
export default class RouterExplorer {
    private readonly metadataScanner;
    constructor(metadataScanner: MetadataScanner);
    explore<T extends CommandHandler>(controllers: BotCommandControllerInterface[], applicationRef: T): void;
    scanForPaths(instance: BotCommandControllerInterface, prototype?: object): RouteDefinition[];
    exploreMethodMetadata(instance: BotCommandControllerInterface, prototype: object, methodName: string): RouteDefinition;
    private applyCallbackToRouter;
}
export {};
