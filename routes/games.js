import { Router } from 'express'
import * as gamesCtrl from "../controllers/games.js"
import { isLoggedIn } from '../middleware/middleware.js'

export {
  router
}

const router = Router()

router.get("/", gamesCtrl.index)
router.get("/new", isLoggedIn, gamesCtrl.new)
router.post("/", gamesCtrl.create)