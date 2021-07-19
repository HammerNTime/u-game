import { Router } from 'express'
import * as gamesCtrl from "../controllers/games.js"
import { isLoggedIn } from '../middleware/middleware.js'

export {
  router
}

const router = Router()

router.get("/", gamesCtrl.index)
router.get("/new", isLoggedIn, gamesCtrl.new)
router.get("/action", gamesCtrl.action)
router.get("/adventure", gamesCtrl.adventure)
router.get("/rpg", gamesCtrl.rpg)
router.get("/shooter", gamesCtrl.shooter)
router.get("/simulation", gamesCtrl.simulation)
router.get("/sports", gamesCtrl.sports)

router.get("/:id", gamesCtrl.show)
router.post("/", isLoggedIn, gamesCtrl.create)
router.put("/:id/ownGame", isLoggedIn, gamesCtrl.ownGame)