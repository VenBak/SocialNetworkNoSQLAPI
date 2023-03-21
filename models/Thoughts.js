const { Schema, model } = require('mongoose');

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: String,
    CreatedAt: String,
    username: String,
    // reactions: []
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
thoughtSchema
  .virtual('reactionCount')
  // Gets number of friends
  .numberReactions(function () {
    return 'This person has '`${this.length} reactions`;
  })

// Initialize our User model
const Thought = model('user', thoughtSchema);

module.exports = Thought;