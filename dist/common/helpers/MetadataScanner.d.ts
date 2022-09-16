export declare class MetadataScanner {
    scanFromPrototype<T, R = any>(instance: T, prototype: object, callback: (name: string) => R): R[];
    getAllFilteredMethodNames(prototype: object): IterableIterator<string>;
}
