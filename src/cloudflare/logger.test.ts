import * as testing from 'start-testing'
import { chaiAssert } from 'start-testing/dist/extra/testUtils.js'
import { CloudflareLogger } from './logger.js'


export async function testCloudflareLoggerToJSON(t: testing.Context) {
    class TestLogger extends CloudflareLogger {
        assert(t: testing.Context) {
            const assert = chaiAssert(t)
            assert.deepEqual(this.toJSON(), {
                logs: [{ level: testing.LogLevel.DEFAULT, message: ["test"] }]
            })
        }
    }

    const logger = new TestLogger()
    logger.print("test")
    logger.assert(t)
}