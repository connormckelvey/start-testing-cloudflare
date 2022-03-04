import { NodeColorLogger } from  'start-testing/dist/extra/nodeLogger.js'
import { CloudflareContextJSON } from './cloudflareContext.js'

export class LocalLogger extends NodeColorLogger {
    static fromJSON(data: CloudflareContextJSON) {
        const logger = new LocalLogger()
        logger.logs = data.logger.logs
        return logger
    }

    new = () => new LocalLogger()
}