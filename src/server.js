import express from 'express'
import logger from './utils/logger.js'
import pathRoutes from './routes/v1/wheather.js'

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.weatherPath = '/v1'
        this.routes()
    }

    routes() {
        this.app.use(this.weatherPath, pathRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            logger.info(`Servidor corriendo en puerto ${this.port}`)
        })
    }
}

export default Server
