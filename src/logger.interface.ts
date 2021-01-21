export interface ILoggerService {
    log(message: string, tags?: string[]): void;
    warn(message: string, tags?: string[]): void;
    debug(message: string, tags?: string[]): void;
    error(message: string, tags?: string[]): void;
    verbose(message: string, tags?: string[]): void;
}
