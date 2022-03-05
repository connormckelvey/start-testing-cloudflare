import * as testing from 'start-testing'
import { chaiAssert } from 'start-testing/dist/extra/testUtils.js'
import { CloudflareContext } from './context.js'
import { CloudflareLogger } from './logger.js'


class QuietLogger extends CloudflareLogger {
    new = () => new QuietLogger()
    dump() {}
}

export async function testCloudflareContextToJSON(t: testing.Context) {
    class TestContext extends CloudflareContext {
        new = (name: string) => new TestContext(name, this.opts, this.cf)

        assert(t: testing.Context) {
            const assert = chaiAssert(t)
            assert.lengthOf(this.subContexts, 1)

            const subContext = this.subContexts[0] as TestContext
            const actual = subContext.toJSON()

            assert.equal(actual.name, 'test-name / sub-test-name')
            assert.deepEqual(actual.errors, ['bar'])
            assert.equal(actual.exception!.message, 'baz')
            assert.deepEqual(actual.subContexts, [])
            assert.deepEqual(actual.logger.logs.slice(0, -1), [
                {
                    level: testing.LogLevel.INFO,
                    message: ['TEST: test-name / sub-test-name...']
                },
                {
                    level: testing.LogLevel.DEFAULT,
                    message: ['foo']
                },
                {
                    level: testing.LogLevel.ERROR,
                    message: ['FAILED:']
                },
                {
                    level: testing.LogLevel.ERROR,
                    message: ['ERROR: bar']
                },
                {
                    'level': testing.LogLevel.ERROR,
                    message: ['FATAL: Error: baz']
                },
            ])
        }
    }

    const testCtx = new TestContext('test-name', {
        logger: new QuietLogger()
    })

    await testCtx.run('sub-test-name', async t => {
        t.log('foo')
        t.error('bar')
        t.fatal('baz')
    })

    testCtx.assert(t)
}