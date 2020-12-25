/* eslint-disable no-underscore-dangle */
const { Post, Activity } = require('../models');

/**
 * Default view for the one who has created the post?
 * Depends!, but if we go by facebook/quora/IG/etc Yes!
 */
const registerViewHelper = async (postId, userId) => {
  let activity = await Activity.findOne({ postId, userId });
  if (activity) return;
  activity = new Activity({ postId, userId });
  await activity.save();
};

exports.createPost = async (req, res) => {
  const post = new Post({ createdBy: req.user._id, content: req.body.content });
  await post.save();
  await registerViewHelper(post._id, req.user._id);
  return res.status(201).send(post);
};

/**
 * Controller for registering the view when needed separately.
 */
exports.registerView = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(400).send('Invalid Post ID');

  await registerViewHelper(req.params.id, req.user._id);
  return res.status(201).send('Post View registered!');
};

/**
 * We could have the total number of viewers and the post viewers in the same controller.
 * Only the number of views
 */

exports.getTotalViews = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(400).send('Invalid Post ID');

  /** Uncomment the below line to include the current user view too! */
  // await registerViewHelper(req.params.id, req.user._id);

  const totalPostViews = await Activity.find({ postId: req.params.id });
  return res.status(200).json({ totalPostViews: totalPostViews.length });
};

/**
 * This controller gives the view including the current user's view.
 */
exports.getViewers = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(400).send('Invalid Post ID');

  await registerViewHelper(req.params.id, req.user._id);

  const postViewers = await Activity.find({ postId: req.params.id }).populate('userId');

  const viewers = postViewers.map((view) => ({
    userId: view.userId._id,
    username: view.userId.username,
  }));

  return res.status(200).json({ totalViews: postViewers.length, viewers });
};
