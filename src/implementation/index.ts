import winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';
import { ILoggerService } from './logger.interface';

export class Logger implements ILoggerService {
    private logger: any;
    readonly transports: any[];
    readonly level: string;
    readonly stage: string;

    constructor(stage: string, level: string, service: string) {
        this.level = level;
        this.stage = stage;

        if (this.stage === 'prod') {
            this.transports = [
                new WinstonCloudWatch({
                    logGroupName: 'testing',
                    logStreamName: 'first',
                    awsRegion: 'us-east-1',
                }),
            ];
        } else {
            this.transports = [new winston.transports.Console()];
        }

        this.logger = winston.createLogger({
            level: this.level,
            defaultMeta: { service },
            transports: this.transports,
        });
    }

    static create(stage: string, level: string, service: string) {
        return new Logger(stage, level, service);
    }

    log(message: string, tags?: string[]): any {
        return this.logger.info(message, tags);
    }

    warn(message: string, tags?: string[]) {
        return this.logger.warn(message, tags);
    }

    error(message: string, tags?: string[]) {
        return this.logger.error(message, tags);
    }

    debug(message: string, tags?: string[]) {
        return this.logger.debug(message, tags);
    }

    verbose(message: string, tags?: string[]) {
        return this.logger.debug(message, tags);
    }
}
