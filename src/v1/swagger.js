import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import config from '../config/index.js'

const { HOST, PORT } = config.server

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express workout API',
      version: '1.0.0'
    }
  },
  apis: ['./src/v1/routes/workout.js', './src/database/workout.js', './src/database/record.js']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get('/api/v1/docs.json', (_, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  console.info(`
    Version 1 docs are available on http://${HOST}:${PORT}/api/v1/docs
  `.trim())
}

export default swaggerDocs
