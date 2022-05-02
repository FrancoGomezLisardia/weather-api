import { Router } from 'express'

import { location, currenCity, forecast } from '../../controllers/wheather.js'

const router = Router()

router.get('/location', location)

router.get('/current/:city?', currenCity)

router.get('/forecast/:city?', forecast)

export default router
