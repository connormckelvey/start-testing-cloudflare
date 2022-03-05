import fetch from 'node-fetch';
import { LocalContext } from './context.js';
import { LocalLogger } from './logger.js';
const defaultOptions = {
    logger: new LocalLogger()
};
export class LocalRunner extends LocalContext {
    cloudflareRunner;
    constructor(name, cloudflareRunner, opts = defaultOptions) {
        super(name, opts);
        this.cloudflareRunner = cloudflareRunner;
    }
    async runSuite(worker = 'http://127.0.0.1:8787') {
        for (const [name] of Object.entries(this.cloudflareRunner.tests)) {
            const url = `${worker}/${name}`;
            const res = await fetch(url, {
                method: 'post',
            });
            const data = (await res.json());
            const ctx = LocalContext.fromJSON(data.subContexts[data.subContexts.length - 1]);
            this.addCtx(name, ctx);
            ctx.dumpLogs();
        }
        const numFailed = this.numFailed();
        if (numFailed > 0) {
            this.logger.warn(`${numFailed} test failure${numFailed > 1 ? 's' : ''}`);
        }
        this.dumpLogs();
        return numFailed;
    }
}
//# sourceMappingURL=runner.js.map