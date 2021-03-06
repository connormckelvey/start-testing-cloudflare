import * as testing from 'start-testing'
import { CloudflareRunner, CloudflareContext } from 'start-testing-cloudflare/dist/cloudflare/index.js'

interface Env {
    FooObject: DurableObjectNamespace
}

const tests = {
    testFoo: async (t: testing.Context) => {
        t.log('foo')
    },
    testBar: async (t: testing.Context) => {
        await new Promise((res) => {
            setTimeout(res, 3000)
        })
    },
}

export default new CloudflareRunner('cloudflare tests', tests)

