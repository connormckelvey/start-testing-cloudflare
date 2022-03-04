import * as testing from 'start-testing'
import fetch from 'node-fetch'

import { CloudflareContextJSON } from './cloudflareContext.js'
import { LocalContext } from './localContext.js'
import { CloudflareRunner } from './cloudflareRunner.js'
import { LocalLogger } from './localLogger.js'

const defaultOptions = {
    logger: new LocalLogger()
}

export class LocalRunner extends LocalContext {
    constructor(
        name: string,
        private readonly cloudflareRunner: CloudflareRunner,
        opts: testing.ContextOptions = defaultOptions
    ) {
        super(name, opts)
    }

    async runSuite(worker: string = 'http://127.0.0.1:8787'): Promise<number> {
        for (const [name] of Object.entries(this.cloudflareRunner.tests)) {
            const url = `${worker}/${name}`
            const res = await fetch(url, {
                method: 'post',
            })
            const data = (await res.json()) as CloudflareContextJSON
            const ctx = LocalContext.fromJSON(data.subContexts[data.subContexts.length - 1])
            this.addCtx(name, ctx)
            ctx.dumpLogs()
        }

        const numFailed = this.numFailed()
        if (numFailed > 0) {
            this.logger.warn(`${numFailed} test failure${numFailed > 1 ? 's' : ''}`)
        }
        this.dumpLogs()
        return numFailed
    }
}