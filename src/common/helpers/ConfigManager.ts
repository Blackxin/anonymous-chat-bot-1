import * as dotenv from 'dotenv';
dotenv.config();

import { isUndefined } from '../utils';

export default class ConfigManager {
    public static getEnv = (name: string): string => {
        let env: string|undefined = process.env[name];

        if (isUndefined(env)) throw new Error(`Undefined environmental variable with name ${name}`);

        return env;
    }
}
