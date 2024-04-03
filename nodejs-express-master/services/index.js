const { passport } = require('../authentication/passport');
const userRequired = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || user == null || user === false) {
      res.json({ data: { error: 'Failed to authenticate' } });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
}

module.exports = {
  userRequired
}