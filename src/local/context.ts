import * as testing from 'start-testing'
import { CloudflareContextJSON } from '../cloudflare/context.js'
import { LocalLogger } from './logger.js'

export class LocalContext extends testing.Context {
    static fromJSON(data: CloudflareContextJSON) {
        const ctx = new LocalContext(data.name, { logger: new LocalLogger() })
        ctx.logger = LocalLogger.fromJSON(data)
        ctx.failed = data.failed
        ctx.errors = data.errors
        ctx.subContexts = data.subContexts.map(data => {
            return LocalContext.fromJSON(data)
        })
        if (data.exception) {
            ctx.exception = data.exception
        }
        return ctx
    }

    new = (name: string) => new LocalContext(name, this.opts)

    dumpLogs() {
        this.logger.dump()
    }
}