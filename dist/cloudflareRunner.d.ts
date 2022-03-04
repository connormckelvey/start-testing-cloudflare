import * as testing from 'start-testing';
import { CloudflareContext } from './cloudflareContext.js';
export declare class CloudflareRunner extends CloudflareContext {
    readonly tests: testing.Tests;
    constructor(name: string, tests: testing.Tests, opts?: testing.ContextOptions);
    fetch(req: Request): Promise<Response>;
    private runTest;
}
