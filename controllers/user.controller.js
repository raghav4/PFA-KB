const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { tryCatch } = require('../middlewares');

exports.signUp = tryCatch(async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });
  if (user) return res.status(400).send('Username already registered');

  user = new User({ username, password });
  const salt = await bcrypt.genSalt(15);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  return res.status(201).send('Account Created!');
});

exports.logIn = tryCatch(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('Invalid Username or Password');

  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) return res.status(401).send('Invalid Username or Password');

  const jwtToken = user.generateAuthToken();
  return res.header('x-auth-token', jwtToken).send('Login Successful!');
});
