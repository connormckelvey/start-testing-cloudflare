import { NodeColorLogger } from 'start-testing/dist/extra/nodeLogger.js';
import { CloudflareContextJSON } from './cloudflareContext.js';
export declare class LocalLogger extends NodeColorLogger {
    static fromJSON(data: CloudflareContextJSON): LocalLogger;
    new: () => LocalLogger;
}
