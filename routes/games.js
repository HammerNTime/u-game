import { Router } from 'express'
import * as gamesCtrl from "../controllers/games.js"
import { isLoggedIn } from '../middleware/middleware.js'

export {
  router
}

const router = Router()

router.get("/", gamesCtrl.index)
router.get("/new", isLoggedIn, gamesCtrl.new)
router.get("/:id", gamesCtrl.show)
router.post("/", isLoggedIn, gamesCtrl.create)
router.put("/:id/ownGame", gamesCtrl.ownGame)