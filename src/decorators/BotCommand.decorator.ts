import { PATH_METADATA } from "../constants";

export const BotCommand = (name: string): MethodDecorator => {
    if (!name.startsWith('/')) throw new Error("Invalid command name: must starts with '/' symbol")
    return (target: object, key: string|symbol, descriptor: TypedPropertyDescriptor<any>) => {
        Reflect.defineMetadata(PATH_METADATA, name, descriptor.value);
        return descriptor;
    };
}
