import { Router } from 'express'
import * as reviewsCtrl from "../controllers/reviews.js"
import { isLoggedIn } from '../middleware/middleware.js'

export {
  router
}

const router = Router()

router.get("/:id/new", isLoggedIn, reviewsCtrl.new)
router.post("/:id", isLoggedIn, reviewsCtrl.create)