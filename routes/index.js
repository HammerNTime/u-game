import { Router } from 'express'
import { currentview } from '../middleware/middleware.js'
export {
  router
}

const router = Router()
router.get('/', function (req, res) {
  if (currentview) {
    res.redirect(currentview || "/")
  }
  res.render('index', { title: 'Home', user: req.user ? req.user : null })
})
