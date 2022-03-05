import * as testing from 'start-testing'
import { NodeColorLogger } from 'start-testing/dist/extra/nodeLogger.js'
import * as cloudflareContextTests from '../src/cloudflare/context.test.js'
import * as cloudflareLoggerTests from '../src/cloudflare/logger.test.js'
import * as integrationTests from '../test/integration.test.js'

const tests = {
    ...cloudflareContextTests,
    ...cloudflareLoggerTests,
    ...integrationTests,
}

async function runTests() {
    testing.Runner.runSuite('tests', tests, { logger: new NodeColorLogger() })
        .then(process.exit)

}

runTests()