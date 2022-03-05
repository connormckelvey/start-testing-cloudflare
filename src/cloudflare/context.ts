import * as testing from 'start-testing'
import { CloudflareLogger } from './logger.js'

export type CloudflareContextJSON = {
    name: string
    failed: boolean
    errors: any[],
    exception?: Error,
    subContexts: CloudflareContextJSON[],
    logger: {
        logs: testing.LogEntry[]
    }
}

// TODO: this is hacky, but avoids a mess with type conflicts
export interface ExecutionContext {
    waitUntil(promise: Promise<any>): void;
    passThroughOnException(): void;
}

export type CloudflareEnvironment<E = any> = {
    env?: E,
    ctx?: ExecutionContext
}

export class CloudflareContext<E = any> extends testing.Context {
    readonly cf: CloudflareEnvironment<E> = {}

    constructor(name: string, opts: testing.ContextOptions, cf: CloudflareEnvironment = {}) {
        super(name, opts)
        this.cf = cf
    }

    new = (name: string) => new CloudflareContext(name, this.opts, this.cf)

    protected toJSON(): CloudflareContextJSON {
        return {
            name: this.name,
            failed: this.failed,
            errors: this.errors,
            exception: this.exception,
            subContexts: this.subContexts.map((ctx) => (ctx as CloudflareContext).toJSON()),
            logger: (this.logger as CloudflareLogger).toJSON()
        }
    }
}