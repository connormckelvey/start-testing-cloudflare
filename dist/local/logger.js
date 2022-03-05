import { NodeColorLogger } from 'start-testing/dist/extra/nodeLogger.js';
export class LocalLogger extends NodeColorLogger {
    static fromJSON(data) {
        const logger = new LocalLogger();
        logger.logs = data.logger.logs;
        return logger;
    }
    new = () => new LocalLogger();
}
//# sourceMappingURL=logger.js.map