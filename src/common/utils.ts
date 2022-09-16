export const isFunction = (val: any): boolean => typeof val === 'function';
export const isUndefined = (obj: any): obj is undefined =>
    typeof obj === 'undefined';
export const isConstructor = (val: any): boolean => val === 'constructor';
export const isNil = (val: any): val is null | undefined =>
    isUndefined(val) || val === null;
