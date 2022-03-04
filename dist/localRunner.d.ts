import * as testing from 'start-testing';
import { LocalContext } from './localContext.js';
import { CloudflareRunner } from './cloudflareRunner.js';
export declare class LocalRunner extends LocalContext {
    private readonly cloudflareRunner;
    constructor(name: string, cloudflareRunner: CloudflareRunner, opts?: testing.ContextOptions);
    runSuite(worker?: string): Promise<number>;
}
