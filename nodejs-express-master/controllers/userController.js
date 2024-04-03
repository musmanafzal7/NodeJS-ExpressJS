const models = require("../database/models");
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();
    return res.status(200).json({success: true, users: users  });
  } catch (error) {
    return res.status(500).json({success: false, error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()){
      return res.status(500).json({success: false, error: errors.array()});
    }
    const userId = req.params.userId;
    const user = await models.User.findOne({ where: { id: userId } });
    if(!user) {
      return res.status(404).json({success: false, error: `User not found for User Id ${userId}` });
    }
    return res.status(200).json({success: true, user: user });
  } catch (error) {
    return res.status(500).json({success: false, error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()){
      return res.status(500).json({success: false, error: errors.array()});
    }
    const { userId } = req.params;

    if(req.body.password) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
    }
    
    const [updated] = await models.User.update(req.body, {
      where: { id: userId }, individualHooks: true
    });
    if (updated) {
      const updatedUser = await models.User.findOne({ where: { id: userId } });
      return res.status(200).json({success: true, user: updatedUser });
    }
    res.status(500).json({success: false, error: `User not found for userId ${userId}` });
  } catch (error) {
    return res.status(500).json({success: false, error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()){
      return res.status(500).json({success: false, error: errors.array()});
    }
    const { userId } = req.params;
    const deleted = await models.User.destroy({
      where: { id: userId }
    });

    if (deleted) {
      return res.status(200).json({success: true, message: 'Deleted successfully' });
    }

    res.status(500).json({success: false, error: `User not found for userId ${userId}` });
  } catch (error) {
    return res.status(500).json({success: false, error: error.message });
  }
};

const createProfile = async (req, res) => {
  try {
    if(!req.file) {
      return res.status(404).json({success: false, error: 'Profile image not uploaded' });
    }
    const userId = req.user.id;
    const user = await models.User.findOne({ where: { id: userId } });
    user.set({
      'profile': req.file.path
    })
    await user.save();
    res.status(200).json({success: true, message: 'Successfully profile updated' });
    
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
}

const addUser = async (req, res) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({success: false, error: errors.array() });
    }
    const user = await models.User.create(req.body);
    return res.status(201).json({success: true, user: user });
  } catch (error) {
    res.status(500).json({success: false, error: error.message });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createProfile,
  addUser
};
