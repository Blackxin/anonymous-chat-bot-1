"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNil = exports.isConstructor = exports.isUndefined = exports.isFunction = void 0;
const isFunction = (val) => typeof val === 'function';
exports.isFunction = isFunction;
const isUndefined = (obj) => typeof obj === 'undefined';
exports.isUndefined = isUndefined;
const isConstructor = (val) => val === 'constructor';
exports.isConstructor = isConstructor;
const isNil = (val) => (0, exports.isUndefined)(val) || val === null;
exports.isNil = isNil;
//# sourceMappingURL=utils.js.map