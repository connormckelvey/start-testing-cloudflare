import * as testing from 'start-testing';
import { CloudflareContextJSON } from './cloudflareContext.js';
export declare class LocalContext extends testing.Context {
    static fromJSON(data: CloudflareContextJSON): LocalContext;
    new: (name: string) => LocalContext;
    dumpLogs(): void;
}