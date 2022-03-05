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

export class CloudflareContext extends testing.Context {    
    new = (name: string) => new CloudflareContext(name, this.opts) 

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