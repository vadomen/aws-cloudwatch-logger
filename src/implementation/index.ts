import { createLogger, transports  } from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';
import { ILoggerService } from './logger.interface';

export class Logger implements ILoggerService {
  private logger: any;
  readonly transports: any[];
  readonly level: string;
  readonly stage: string;

  constructor(stage: string, level: string, defaultMeta: object) {
    this.level = level;
    this.stage = stage;

    if (this.stage === 'prod') {
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
      level: this.level,
      defaultMeta,
      transports: this.transports,
    });
  }

  static create(stage: string, level: string, defaultMeta: object) {
    return new Logger(stage, level, defaultMeta);
  }

  log(message: string, tags?: string[]): any {
    return this.logger.info(message, { tags });
  }

  warn(message: string, tags?: string[]) {
    return this.logger.warn(message, { tags });
  }

  error(message: string, tags?: string[]) {
    return this.logger.error(message, { tags });
  }

  debug(message: string, tags?: string[]) {
    return this.logger.debug(message, { tags });
  }

  verbose(message: string, tags?: string[]) {
    return this.logger.debug(message, { tags });
  }
}
