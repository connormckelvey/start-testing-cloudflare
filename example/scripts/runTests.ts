import cloudflareRunner from '../src/index.js'
import { LocalRunner } from 'start-testing-cloudflare'

new LocalRunner('tests', cloudflareRunner).runSuite()
    .then(process.exit)
    .catch(console.log)
