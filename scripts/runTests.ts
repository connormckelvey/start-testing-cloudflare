import cloudflareRunner from '../src/index.js'
import { LocalRunner } from '../src/localRunner.js'

new LocalRunner('tests', cloudflareRunner).runSuite()
    .then(process.exit)
    .catch(console.log)
