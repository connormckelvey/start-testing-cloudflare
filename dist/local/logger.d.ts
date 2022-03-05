import { NodeColorLogger } from 'start-testing/dist/extra/nodeLogger.js';
import { CloudflareContextJSON } from '../cloudflare';
export declare class LocalLogger extends NodeColorLogger {
    static fromJSON(data: CloudflareContextJSON): LocalLogger;
    new: () => LocalLogger;
}
