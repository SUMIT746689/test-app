export const sessionCheck = (req, res, next) => {
  // req.session.auth = 'mehedi';
  // req.session.cookie.maxAge = 2592000

  console.log(req.sessionID);
  res.setHeader('Content-Type', 'text/html')
  console.log(req.body);
  if (req.body._id) {
    if (req.session.authenticated) return next();
    console.log(req.session.authenticated);
    res.status(404).json({ "err": "invalid credentials" })
  }
  else {
    console.log(req.session)
    next();
  }
  // res.cookie('user_session', 'hi')
  // console.log(new Date(Date.now()+1))
  // req.session.cookie.expires = new Date(Date.now())
  // next();
}

