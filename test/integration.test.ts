import * as path from 'path'
import { spawnSync } from 'child_process'
import { Wrangler } from './utils/wrangler.js'

import * as testing from 'start-testing'
import { chaiAssert } from 'start-testing/dist/extra/testUtils.js'


export async function testIntegration(t: testing.Context) {
    const assert = chaiAssert(t)

    const exampleDir = path.join(process.cwd(), 'example')
    const wrangler = new Wrangler(exampleDir)

    await wrangler.wait()
    const results = spawnSync("npm", ["test"], {
        cwd: exampleDir,
    })
    await wrangler.stop()

    assert.equal(results.status, 0)
}


