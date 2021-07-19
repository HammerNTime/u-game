import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from "../controllers/profiles.js"

export {
  router
}

const router = Router()

router.get("/:id/add-console", isLoggedIn, profilesCtrl.addConsole)
router.get("/:id/edit", isLoggedIn, profilesCtrl.edit)
router.get("/:id", isLoggedIn, profilesCtrl.show)
router.post("/:id/add-console", isLoggedIn, profilesCtrl.createConsole)