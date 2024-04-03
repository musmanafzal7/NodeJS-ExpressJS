//importing modules
const express = require("express");
const model = require("../database/models");
const { validationResult } = require('express-validator');

//Assigning db.users to User variable
const User = model.User;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email

const saveUser = async (req, res, next) => {
  //search the database to see if user exist
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ success: false, error: errors.array() });
    }
    //checking if email already exist
    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    //if email exist in the database respond with a status of 409
    if (emailcheck) {
      return res.status(409).json({ success: false, error: "Email already exists", params: req.body });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

//exporting module
module.exports = {
  saveUser,
};