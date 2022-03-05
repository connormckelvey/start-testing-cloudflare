# Start Testing Cloudflare

Start Testing Cloudflare is a lightweight test harness for testing Cloudflare Workers and Durable Objects using the minimal [Start Testing](https://github.com/connormckelvey/start-testing) library. 

## How it Works

Start Testing Cloudflare extends `testing.Context` (see [Start Testing](https://github.com/connormckelvey/start-testing)) to create two new `Runner` classes. 

1. The `CloudflareRunner` class implements Cloudlare's Fetcher interface and gets deployed as a Cloudflare Worker. 
2. The `LocalRunner` class triggers individual top level tests via an HTTP post request to the `CloudflareRunner` worker. 
    - The Response is a  serialized `CloudflareContext` representing the test result. 
    - The `LocalRunner` deserializes the response and maps it to a `LocalContext` used for local logging and reporting.


## Example

`test/index.ts`
```typescript
import * as testing from 'start-testing'
import { CloudflareRunner, CloudflareContext } from 'start-testing-cloudflare/dist/cloudflare/index.js'


// Define your env interface for various resource bindings
interface Env {
    FooObject: DurableObjectNamespace
}

const tests = {
    testDurableObject: async (t: CloudflareContext<Env>) => {
        const env = t.cf.env!

        const id = env.FooObject.idFromName("test")
        const obj = env.FooObject.get(id)

        const res = await obj.fetch("/test")
        if (res.status != 200) {
            t.error(`got ${res.status}`)
        }
       
    }
}

export default new CloudflareRunner<Env>('cloudflare tests', tests)
```

`scripts/runTests.ts`
```typescript
import cloudflareRunner from '../test/index.js'
import { LocalRunner } from 'start-testing-cloudflare'

new LocalRunner('tests', cloudflareRunner).runSuite()
    .then(process.exit)
    .catch(e => { throw e })
```

### Run

```bash
node --loader ts-node/esm ./scripts/runTests.ts
```

