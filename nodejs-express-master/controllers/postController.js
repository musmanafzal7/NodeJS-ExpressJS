const models = require("../database/models");
const { validationResult } = require('express-validator');
const sequelize = require('sequelize');

const createPost = async (req, res) => {
    try {
        const errors = await validationResult(req);
        if (!errors.isEmpty()){
          return res.status(500).json({success: false, error: errors.array()});
        }

        try {
            const result = await models.sequelize.transaction(async (t) => {
                const post = await models.Post.create({ ...req.body.post, userId: req.user.id}, { transaction: t });
                const newTags = [];
                req.body.postTags.forEach(item => {
                  newTags.push({name: item, postId: post.id})
                });
                await models.Tag.bulkCreate(newTags, { transaction: t });
                return post;
            });
          } catch (error) {
            return res.status(500).json({success: false, error: error.message});
          }

        return res.status(201).json({success: true, message: "Transaction completed successfully" });
    } catch (error) {
      return res.status(500).json({success: false, error: error.message });
    }
  };

const getAllPosts = async (req, res) => {
  try {
    const posts = await models.Post.findAll();
    return res.status(200).json({success: true, posts });
  } catch (error) {
    return res.status(500).json({success: false, error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()){
      return res.status(500).json({success: false, error: errors.array()});
    }
    const userId = req.params.userId;
    const user = await models.User.findOne({ where: { id: userId } });
    return res.status(200).json({success: true, user });
  } catch (error) {
    return res.status(500).json({success: true, error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()){
      return res.status(500).json({success: false, error: errors.array()});
    }
    const { userId } = req.params;
    
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

const deletePost = async (req, res) => {
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

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};
