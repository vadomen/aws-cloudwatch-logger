import { ILoggerService } from './logger.interface';
export declare class Logger implements ILoggerService {
    private logger;
    readonly transports: any[];
    readonly level: string;
    readonly stage: string;
    constructor(stage: string, level: string, service: string);
    static create(stage: string, level: string, service: string): Logger;
    log(message: string, tags?: string[]): any;
    warn(message: string, tags?: string[]): any;
    error(message: string, tags?: string[]): any;
    debug(message: string, tags?: string[]): any;
    verbose(message: string, tags?: string[]): any;
}
