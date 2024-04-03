require('dotenv').config()
const models = require("../database/models");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { passport } = require('../authentication/passport');
const {userRequired} =  require('../services');

const signup = async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    const token = await jwt.sign({id: user.id, email: user.email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h'})
    user.jwtToken = token;
    await user.save();
    return res.status(200).json({ success: true, user: user, token: token});
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const login = async (req, res, next) => {
    try {
      const errors = await validationResult(req);

      if (!errors.isEmpty()){
        return res.status(500).json({ success: false, error: errors.array()});
      }

      const user = req.user;
      const token = await jwt.sign({id: user.id, email: user.email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h'});
      user.jwtToken = token;
      await user.save();
      return res.status(200).json({success: true, user: user, token: token});
    } catch (error) {
      return res.status(500).json({success: false, error: error.message });
    }
};

const loginUser = async(req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {

    console.log(info, user, err);
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(
        new Error('User is not authenticated')
      );
    }
    return res.status(200).json({success: true,  user: user});
  })(req, res, next);
};

module.exports = {
    login,
    signup,
    loginUser
}