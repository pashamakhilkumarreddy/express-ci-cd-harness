import 'dotenv/config'
import development from './development.js'
import staging from './staging.js'
import production from './production.js'

const _ENV_ = process.env

const ENV = _ENV_.NODE_ENV || 'development'

const config = {
  development,
  staging,
  production
}[ENV]

const statusConfig = {
  title: 'Express Server Status',
  path: '/status',
  spans: [{
    interval: 1,
    retention: 60
  },
  {
    interval: 15,
    retention: 60
  },
  {
    interval: 30,
    retention: 60
  }
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    eventLoop: true,
    heap: true,
    responseTime: true,
    rps: true,
    statusCodes: true
  },
  healthChecks: [{
    protocol: 'http',
    host: config.server.HOST,
    path: '/',
    port: config.server.PORT
  }]
}

export default { ...config, ENV, statusConfig }
