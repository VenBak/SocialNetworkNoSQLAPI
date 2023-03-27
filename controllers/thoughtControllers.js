const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne(
      { _id: req.params.thoughtId })
    .select('-__v')
    .then((thought) => !thought ? res.status(404).json({ message: 'ID Doesnt match any thoughts' }) : res.json(thought))
    .catch((err) => res.status(500).json(err));
  },
  // create a new thought and adds thought to associated user
  createThought(req, res) {
    Thought.create(req.body)
      .then((_id) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: _id }},
          { runValidators: true, new: true })
        .then((user) => !user ? res.status(404).json({ message: 'ID doesnt match any user' }): res.json(user))
        .catch((err) => res.status(500).json(err))
      })
      .catch((err) => res.status(500).json(err));
  },
  // Updates thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true })
    .then((thought) => !thought ? res.status(404).json({ message: 'ID doesnt match any thought' }) : res.json({ message: 'Thought updated', thought }))
    .catch((err) => res.status(500).json(err));
  },
  // Deletes thought
  deleteThought(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId })
    .then((thought) => !thought ? res.status(404).json({ message: 'ID doesnt match any thought' }) : res.json({ message: 'Thought deleted' }))
    .catch((err) => res.status(500).json(err));
  },
  // Creates a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body }},
      { runValidators: true, new: true })
    .then((thought) => !thought ? res.status(404).json({ message: "ID doesnt match any thought" }) : res.json(thought))
    .catch((err) => res.status(500).json(err));
  },
  // Deletes a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId }}},
      { runValidators: true, new: true })
    .then((thought) => !thought ? res.status(404).json({ message: "ID doesnt match any thought" }) : res.json(thought))
    .catch((err) => res.status(500).json(err));
  },
};