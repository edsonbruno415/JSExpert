import Http from 'http'

async function InjectHttpInterceptor() {
  const oldEmit = Http.Server.prototype.emit
  Http.Server.prototype.emit = function (...args) {
    const [type, req, res] = args
    if (type === 'request') {
      res.setHeader('X-Instrumented-by', 'ErickWendel')
    }
    return oldEmit.apply(this, args)
  }
}

export {
  InjectHttpInterceptor
}