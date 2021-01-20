import { LambdaLog } from 'lambda-log';
import { ILoggerService } from './logger.interface';

export class Logger implements ILoggerService {
    private lambdaLogger: any;

    private stage: string;

    constructor(tags: any[], env: string) {
        this.stage = env;

        this.lambdaLogger = new LambdaLog();
        this.lambdaLogger.options.tags.push(...tags);
    }

    static create(tags: any[], env: string) {
        return new Logger(tags, env);
    }

    log(message: string) {
        if (this.stage === 'local') return console.log(message);
        return this.lambdaLogger.info(message);
    }

    warn(message: string | object) {
        if (this.stage === 'local') return console.log(message);
        return this.lambdaLogger.warn(message);
    }

    error(message: string | object) {
        if (this.stage === 'local') return console.log(message);
        return this.lambdaLogger.error(message);
    }

    debug(message: string | object) {
        if (this.stage === 'local') return console.log(message);
        return this.lambdaLogger.debug(message);
    }

    verbose(message: string | object) {
        if (this.stage === 'local') return console.log(message);
        return this.lambdaLogger.debug(message);
    }
}
