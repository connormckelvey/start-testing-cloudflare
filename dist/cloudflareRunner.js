import { CloudflareContext } from './cloudflareContext.js';
import { CloudflareLogger } from './cloudflareLogger.js';
const defaultOptions = {
    logger: new CloudflareLogger()
};
export class CloudflareRunner extends CloudflareContext {
    tests;
    constructor(name, tests, opts = defaultOptions) {
        super(name, opts);
        this.tests = tests;
    }
    async fetch(req) {
        const { pathname } = new URL(req.url);
        const [name] = pathname.split('/').reverse();
        try {
            const data = await this.runTest(name);
            return new Response(JSON.stringify(data), { status: 200 });
        }
        catch (e) {
            return new Response(e, { status: 500 });
        }
    }
    async runTest(name) {
        const test = this.tests[name];
        if (name.startsWith("test") && typeof test === 'function') {
            await this.run(name, test);
        }
        return this.toJSON();
    }
}
//# sourceMappingURL=cloudflareRunner.js.map