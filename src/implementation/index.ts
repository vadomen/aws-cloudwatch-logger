import { createLogger, transports } from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';
import { ILoggerService } from './logger.interface';

export class Logger implements ILoggerService {
  private logger: any;
  readonly transports: any[];
  readonly stage = process.env.NODE_ENV || 'local';
  readonly cloudStages = ['prod', 'dev'];

  constructor(context?: string) {
    if (this.cloudStages.includes(this.stage)) {
      const cloudWatch = new WinstonCloudWatch({
        logGroupName: 'testing',
        logStreamName: 'first',
        awsRegion: 'us-east-1',
      });
      this.transports = [cloudWatch];
    } else {
      const console = new transports.Console();
      this.transports = [console];
    }

    this.logger = createLogger({
      defaultMeta: context,
      transports: this.transports,
    });
  }

  static create(context?: string) {
    return new Logger(context);
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
