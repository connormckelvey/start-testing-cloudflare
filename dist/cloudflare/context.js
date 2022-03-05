import * as testing from 'start-testing';
export class CloudflareContext extends testing.Context {
    new = (name) => new CloudflareContext(name, this.opts);
    toJSON() {
        return {
            name: this.name,
            failed: this.failed,
            errors: this.errors,
            exception: this.exception,
            subContexts: this.subContexts.map((ctx) => ctx.toJSON()),
            logger: this.logger.toJSON()
        };
    }
}
//# sourceMappingURL=context.js.map