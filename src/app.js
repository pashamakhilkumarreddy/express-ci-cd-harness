import express from 'express'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'
import responseTime from 'response-time'
import rateLimit from 'express-rate-limit'
import expressStatusMonitor from 'express-status-monitor'
import tooBusy from 'node-toobusy'
import config from './config/index.js'
import v1Routes from './v1/routes/index.js'

const app = express()

tooBusy.lag(12)
tooBusy.interval(250)
tooBusy.smoothingFactorOnRise(1 / 5)
tooBusy.smoothingFactorOnFall(2 / 5)

const {
  server: { PORT, HOST },
  ENV,
  statusConfig
} = config

app
  .use(cors())
  .use(compression())
  .use(helmet())
  .use(morgan('combined'))
  .use(express.json())
  .use(responseTime())
  .use(
    rateLimit({
      windowMs: 24 * 60 * 60 * 1000,
      max: 1000,
      message: 'Too many requests',
      headers: true
    })
  )
  .use(
    express.urlencoded({
      extended: true
    })
  )
  .use(expressStatusMonitor(statusConfig))
  .use(function (_, res, next) {
    if (tooBusy()) {
      res.status(503).send({
        error: false,
        messages: [
          'Server is too busy to handle requests right now'
        ]
      })
    } else {
      next()
    }
  })
  .use('/health-check', (req, res) => {
    res.status(200).send({
      error: false,
      messages: [
        'Server is up and running'
      ]
    })
  })

v1Routes({
  app
})

app.listen(PORT, HOST, () => {
  console.info(
    `App is up and running on ${HOST}:${PORT} in ${ENV} environment`
  )
})
