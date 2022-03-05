import * as testing from 'start-testing';
import { CloudflareRunner } from '../cloudflare/runner.js';
import { LocalContext } from './context.js';
export declare class LocalRunner extends LocalContext {
    private readonly cloudflareRunner;
    constructor(name: string, cloudflareRunner: CloudflareRunner, opts?: testing.ContextOptions);
    runSuite(worker?: string): Promise<number>;
}
