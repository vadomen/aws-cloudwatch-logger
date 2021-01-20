export interface ILoggerService {
    log(message: string | object);
    warn(message: string | object);
    debug(message: string | object);
    error(message: string | object);
    verbose(message: string | object);
}
