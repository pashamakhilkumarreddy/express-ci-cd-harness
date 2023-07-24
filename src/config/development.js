import 'dotenv/config'

const _ENV_ = process.env

const config = {
  server: {
    HOST: _ENV_.HOST || '127.0.0.1',
    PORT: _ENV_.PORT || 3000
  }
}

export default config
