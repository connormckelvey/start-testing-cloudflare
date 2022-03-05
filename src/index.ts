export * from './cloudflare/index.js'
export * from './local/index.js'

let f = {
    fetch(req: Request) {
        console.log(req.cf)
    },
}