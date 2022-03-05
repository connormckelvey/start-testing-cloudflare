import treeKill from 'tree-kill'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'

export class Wrangler {
    private readonly proc: ChildProcessWithoutNullStreams
    constructor(cwd: string) {
        this.handleEarlyClose = this.handleEarlyClose.bind(this)
        this.proc = spawn('wrangler', ["dev"], {
            cwd,
        })  
    }

    private handleEarlyClose() {
        throw new Error('error starting wrangler')
    }

    async wait() {
        this.proc.on('close', this.handleEarlyClose)
        await new Promise<void>((res) => {
            this.proc.stdout.on('data', (data) => {
                console.log(data.toString())
                if (data.toString().includes('Listening on http')) {
                    res()
                }
            })
        })
        this.proc.off('close', this.handleEarlyClose)
    }

    async stop() {
        return new Promise<void>((res, rej) => {
            treeKill(this.proc.pid!, (err) => {
                if (err) {
                    return rej(err)
                }
                res()
            })
        })
    }
}
