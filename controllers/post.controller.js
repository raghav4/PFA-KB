/* eslint-disable no-underscore-dangle */
const { Post, Activity } = require('../models');
const { tryCatch } = require('../middlewares');

/**
 * Default view for the one who has created the post?
 * Depends!, but if we go by facebook/quora/IG/etc Yes!
 */
const registerViewHelper = tryCatch(async (postId, userId) => {
  let activity = await Activity.findOne({ postId, userId });
  if (activity) return;
  activity = new Activity({ postId, userId });
  await activity.save();
});

exports.createPost = tryCatch(async (req, res) => {
  const post = new Post({ createdBy: req.user._id, content: req.body.content });
  await post.save();
  await registerViewHelper(post._id, req.user._id);
  return res.status(201).send(post);
});

exports.registerView = tryCatch(async (req, res) => {
  await registerViewHelper(req.params.id, req.user._id);
  return res.status(201).send('Post View registered!');
});

/**
 * We could have the total number of viewers and the post viewers in the same controller.
 */

exports.getTotalViews = tryCatch(async (req, res) => {
  const totalPostViews = await Activity.find({ postId: req.params.id });
  return res.status(200).json({ totalPostViews: totalPostViews.length });
});

exports.getViewers = tryCatch(async (req, res) => {
  const postViewers = await Activity.find({ postId: req.params.id }).populate('userId');

  const viewers = postViewers.map((view) => ({
    userId: view.userId._id,
    username: view.userId.username,
  }));

  return res.status(200).json({ totalViews: postViewers.length, viewers });
});
