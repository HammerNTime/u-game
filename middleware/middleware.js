export {
  passUserToView,
  isLoggedIn,
  currentview,
}

let currentview = null

function isLoggedIn(req, res, next) {
  currentview = req._parsedOriginalUrl.path
  if (req.isAuthenticated()) {
    currentview = null
    return next()
  } 
  res.redirect('/auth/google')
}

function passUserToView(req, res, next) {
  res.locals.user = req.user ? req.user : null
  next()
}

