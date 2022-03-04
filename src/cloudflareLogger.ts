import * as testing from 'start-testing'

export class CloudflareLogger extends testing.Logger {
    new = () => new CloudflareLogger()

    toJSON() {
        return {
            logs: this.logs,
        }
    }
}