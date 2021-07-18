import { Router } from 'express'
import * as reviewsCtrl from "../controllers/reviews.js"
import { isLoggedIn } from '../middleware/middleware.js'

export {
  router
}

const router = Router()