import * as testing from 'start-testing'
import { CloudflareContext, CloudflareContextJSON } from './cloudflareContext.js'
import { CloudflareLogger } from './cloudflareLogger.js'

const defaultOptions = {
    logger: new CloudflareLogger()
}

export class CloudflareRunner extends CloudflareContext {
    constructor(name: string, readonly tests: testing.Tests, opts: testing.ContextOptions = defaultOptions) {
        super(name, opts)
    }

    async fetch(req: Request) {
        const { pathname } = new URL(req.url)
        const [ name ] = pathname.split('/').reverse()

        try {
            const data = await this.runTest(name)
            return new Response(JSON.stringify(data), { status: 200 })
        } catch(e) {
            return new Response(e, { status: 500 })
        }
    }

    private async runTest(name: string): Promise<CloudflareContextJSON> {
        const test = this.tests[name]
        if (name.startsWith("test") && typeof test === 'function') {
            await this.run(name, test)
        }
        return this.toJSON()
    }
}
