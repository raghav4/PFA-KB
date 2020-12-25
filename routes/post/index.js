const express = require('express');
const { post } = require('../routes.json');
const { auth } = require('../../middlewares');
const { postController } = require('../../controllers');

const router = express.Router();

router.get(post.getTotalViews, postController.getTotalViews);

router.post(post.create, auth, postController.createPost);

router.post(post.addView, auth, postController.registerView);

module.exports = router;
