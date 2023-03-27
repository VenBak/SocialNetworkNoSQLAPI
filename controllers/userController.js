const User = require('../models/Users');

module.exports = {
  // Gets all the users
  getUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
  },
  // Gets a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .select('-__v')
    .then((user) => !user ? res.status(404).json({ message: 'ID doesnt match any user' }) : res.json(user))
    .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
  },
  // Updates a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true })
    .then((user) => !user ? res.status(404).json({ message: 'ID doesnt match any user' }) : res.json({ message: 'User updated', user }))
    .catch((err) => res.status(500).json(err));
  },
  // Delete a user and the associated thoughts with the user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>!user? res.status(404).json({ message: 'ID doesnt match any user' }): Thought.deleteMany({ _id: { $in: user.thoughts }}))
    .then(() => res.json({ message: 'User deleted' }))
    .catch((err) => res.status(500).json(err));
  },
  // Adds a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true })
    .then((user) => !user ? res.status(404).json({ message: 'ID doesnt match any user' }) : res.json(user))
    .catch((err) => res.status(500).json(err));
  },
  // Deletes a friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true })
    .then((user) => !user ? res.status(404).json({ message: 'ID doesnt match any user' }) : res.json(user))
    .catch((err) => res.status(500).json(err));
  }
};
