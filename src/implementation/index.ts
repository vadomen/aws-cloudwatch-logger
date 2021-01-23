import { transports, createLogger, format } from 'winston';
import * as WinstonCloudWatch from 'winston-cloudwatch';
import { ILoggerService } from './logger.interface';

const { combine, timestamp, json } = format;

export class LoggerService implements ILoggerService {
    private logger: any;
    readonly transports: any[];
    readonly stage = process.env.NODE_ENV || 'local';
    readonly level = process.env.LOG_LEVEL || 'silly';
    readonly cloudStages = ['prod', 'dev'];

    constructor(context?: string) {
        const logStreamName = `${this.stage}-${context}`;
        if (this.cloudStages.includes(this.stage)) {
            const cloudWatch = new WinstonCloudWatch({
                logGroupName: `${logStreamName}-awslogs`,
                logStreamName: `${logStreamName}`,
                awsRegion: 'us-east-1', // TODO move region to config
            });
            this.transports = [cloudWatch];
        } else {
            const console = new transports.Console();
            this.transports = [console];
        }

        this.logger = createLogger({
            level: this.level,
            defaultMeta: { service: logStreamName },
            transports: this.transports,
            format: combine(timestamp(), json()),
        });
    }

    static create(context?: string) {
        return new LoggerService(context);
    }

    log(message: string, context?: string): any {
        return this.logger.info(message, context);
    }

    warn(message: string, context?: string) {
        return this.logger.warn(message, context);
    }

    error(message: string, trace?: string, context?: string) {
        return this.logger.error(message, trace, context);
    }

    debug(message: string, context?: string) {
        return this.logger.debug(message, context);
    }

    verbose(message: string, context?: string) {
        return this.logger.debug(message, context);
    }
}
