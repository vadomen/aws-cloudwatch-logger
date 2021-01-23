export interface ILoggerService {
    log(message: any, context?: string): void;
    warn(message: any, context?: string): void;
    debug(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
    verbose(message: any, context?: string): void;
}
