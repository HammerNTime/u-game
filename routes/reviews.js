import { Router } from 'express'
import * as reviewsCtrl from "../controllers/reviews.js"
import { isLoggedIn } from '../middleware/middleware.js'

export {
  router
}

const router = Router()

router.get("/", isLoggedIn, reviewsCtrl.index)
router.get("/:id/new", isLoggedIn, reviewsCtrl.new)
router.get("/:id/edit", isLoggedIn, reviewsCtrl.edit)
router.get("/:id", isLoggedIn, reviewsCtrl.show)
router.post("/:id", isLoggedIn, reviewsCtrl.create)
router.put("/:id", isLoggedIn, reviewsCtrl.update)
router.delete("/:reviewId", isLoggedIn, reviewsCtrl.delete)