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

const getPostViewers = async (postId) => {
  const postViewers = await Activity.find({ postId }).populate('userId');

  return postViewers.map((view) => ({
    userId: view.userId._id,
    username: view.userId.username,
  }));
};

exports.createPost = async (req, res) => {
  const post = new Post({ createdBy: req.user._id, content: req.body.content });
  await post.save();
  // By default add a view for the one who has created the post.
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
 * PUBLIC API
 * Doesn't require to be logged in.
 * Returns the number of views and the number of viewers.
 *
 * !! THIS END POINT DOESN'T REGISTER THE VIEW OF THE LOGGED IN USER
 * !! SINCE IT'S WORKING WITHOUT THE AUTH, HENCE IF THE USER IS LOGGED IN
 * !! WE CAN RECORD HIS/HER VIEW BY ADDING,
 * * => await registerViewHelper(req.params.id, req.user._id);
 */

exports.getTotalViews = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(400).send('Invalid Post ID');

  const viewers = await getPostViewers(req.params.id);

  return res.status(200).json({ totalPostViews: viewers.length, viewers });
};
