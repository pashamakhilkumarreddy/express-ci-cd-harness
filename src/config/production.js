import 'dotenv/config'

const _ENV_ = process.env

const config = {
  server: {
    HOST: _ENV_.HOST || '0.0.0.0',
    PORT: _ENV_.PORT || 3000
  }
}

export default config
